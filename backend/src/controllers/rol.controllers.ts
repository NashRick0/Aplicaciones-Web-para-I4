//Agregar Rol
import { Request, Response } from 'express';
import { Rol } from '../models/rol';

export const addRol = async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body;
        const newRol = new Rol({ name, type }); // status se asigna automáticamente
        await newRol.save();
        res.status(201).json({ message: 'Rol created successfully', rol: newRol });
    } catch (error) {
        res.status(500).json({ message: 'Error creating rol', error });
    }
};


