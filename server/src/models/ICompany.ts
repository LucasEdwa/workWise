import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './IUser';

export interface ICompany extends Document {
  name: string;
  address: string;
  organizationNumber:number;
  users: IUser['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    organizationNumber: { type: Number, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model<ICompany>('Company', CompanySchema);