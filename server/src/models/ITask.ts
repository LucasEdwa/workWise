import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './IUser';
import { ICompany } from './ICompany';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: IUser['_id'];
  assignedTo: IUser['_id']| null;
  company: ICompany['_id'];
  date: Date;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);