import { Document } from 'mongoose';
interface User extends Document {
  email: string;
  password: string;
  username: string;
  confirmed: boolean;
}
export default User;
