import { Document, model, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    status: boolean;
    createDate: Date;
    deleteDate: Date;
    roles: string[]; // Cambiado de role: string a roles: string[]
    firstName: string;
    lastName: string;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    status: {type: Boolean, default: true},
    createDate: {type: Date, default: Date.now},
    deleteDate: {type: Date},
    roles: [{type: String, required: true}], // Cambiado de role a roles
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

export const User = model<IUser>('User', userSchema, 'users');