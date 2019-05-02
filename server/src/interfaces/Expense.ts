import { Document } from 'mongoose';
interface Expense extends Document {
  title: string;
  description: string;
  cost: number;
}
export default Expense;
