import { Document, model, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    price: number;
    qty: number;
    status: boolean;
    description: string;
    createDate: Date;
    deleteDate?: Date;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    status: { type: Boolean, default: true },
    description: { type: String },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date }
});

export const Product = model<IProduct>('Product', productSchema, 'products');