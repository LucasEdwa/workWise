import mongoose, { Schema, Document } from 'mongoose';
import { ICompany } from './ICompany';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  company: ICompany['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);