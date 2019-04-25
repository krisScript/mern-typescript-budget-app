import mongoose, { Document, Schema, Model, model } from 'mongoose';
import User from '../interfaces/User';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
});
UserSchema.methods.confirm = function(): void {
  this.confirmed = true;
  this.save();
};
export default mongoose.model<User>('User', UserSchema);
