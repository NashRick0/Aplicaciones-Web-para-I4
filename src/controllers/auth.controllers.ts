import { Request, Response } from "express";
import { cache } from "../utils/cache";
import { generateAccessToken } from "../utils/token";
import dayjs from "dayjs";
import { User } from "../models/user";
import bcrypt from "bcrypt";

export const loginMethod = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const userId = user._id.toString();
  const token = generateAccessToken(userId);
  const ttlSeconds = 15 * 60; // 15 minutos
  cache.set(token, userId, ttlSeconds);

  return res.json({
    message: "Login successful",
    token,
    userId
  });
}


export const getTimeToken = (req: Request, res: Response) => {
    const {userId} = req.params;

    const ttl = cache.getTtl(userId); // Obtener el tiempo de vida del token
    if(!ttl){
        return res.status(404).json({message: "Token not found"});
    }

    const now = Date.now();
    const timeToLife = Math.floor((ttl - now) / 1000); // Convertir a segundos
    const expTime = dayjs(ttl).format('HH:mm:ss'); // Formato de tiempo

    return res.json({timeToLife, expTime});

}

export const updateToken = (req: Request, res: Response) => {
    const {userId} = req.params;

    const ttl = cache.getTtl(userId); // Obtener el tiempo de vida del token
    if(!ttl){
        return res.status(404).json({message: "Token not found"});
    }

    const newTimeToken:number = 15 * 60; // 15 minutos de expiración
    cache.ttl(userId, newTimeToken); // Actualizar el tiempo de vida del token

    res.json({message: "Token updated"});
}


//Metodo para validar el token sin ruta
export const validateToken = (req: Request, res: Response) => {
    const { token } = req.body;
    const userId = cache.get(token); // Obtener el id del usuario del token
    if(!userId){
        return res.status(401).json({message: "Unauthorized"});
    }

    return res.json({message: "Token is valid"});
}

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
};

// Obtener usuario por username
export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
    }
};

export const saveUser = async (req:Request, res:Response) => {
    const { firstName, lastName, username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            role,
            email
        });

        const user = await newUser.save();

        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Error saving user" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { firstName, lastName, username, email, password, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const userEmail = await User.findOne({email});
    if (userEmail && userEmail.id!== user.id) {
        return res.status(426).json({ message: "Email already exists" });
    }

    user.password = password!=null ? await bcrypt.hash(password, 10) : user.password;
    user.email = email!=null ? email : user.email;
    user.role = role!=null ? role : user.role;
    user.firstName = firstName!=null ? firstName : user.firstName;
    user.lastName = lastName!=null ? lastName : user.lastName;
    user.username = username!=null ? username : user.username;

    const updatedUser = await user.save();
    return res.json({ user: updatedUser });
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.status = false;
    const deletedDate = new Date;

    const deletedUser = await user.save();
    return res.json({ deleteUser })
}