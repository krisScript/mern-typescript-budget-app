import { Document, Schema } from 'mongoose';

interface Expense extends Document {
  title: string;
  description: string;
  cost: number;
  userId: Schema.Types.ObjectId;
}
export default Expense;
