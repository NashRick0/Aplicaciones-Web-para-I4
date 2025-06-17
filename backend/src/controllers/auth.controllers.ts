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

// Crear usuario
export const saveUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, roles, firstName, lastName } = req.body;
        const newUser = new User({
            username,
            email,
            password,
            roles, // Ahora es un arreglo
            firstName,
            lastName
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

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