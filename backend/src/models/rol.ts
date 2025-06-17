import { Document, model, Schema } from 'mongoose';

export interface IRol extends Document {
    name: string;
    type: string;
    status: boolean;
}

const rolSchema = new Schema<IRol>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, default: true }
});

export const Rol = model<IRol>('Rol', rolSchema, 'roles');