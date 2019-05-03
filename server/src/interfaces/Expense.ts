import { Document } from 'mongoose';
interface Expense extends Document {
  title: string;
  description: string;
  cost: number;
  userId: string;
}
export default Expense;
