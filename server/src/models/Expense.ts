import mongoose, { Document, Schema, Model, model } from 'mongoose';
import Expense from '../interfaces/Expense';

const ExpenseSchema: Schema = new Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
  const: { type: Number, required: true },
});

export default mongoose.model<Expense>('User', ExpenseSchema);
