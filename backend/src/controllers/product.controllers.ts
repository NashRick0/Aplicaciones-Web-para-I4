import { Request, Response } from 'express';
import { Product } from '../models/product';

// Crear producto
export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, qty, description } = req.body;
        const newProduct = new Product({ name, price, qty, description });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Obtener todos los productos activos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ status: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Eliminar producto (borrado lógico)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndUpdate(
            id,
            { status: false, deleteDate: new Date() },
            { new: true }
        );
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted (logical)', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};