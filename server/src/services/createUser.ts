import User from '../models/User';
import bcrypt from 'bcryptjs';
interface CreateUserResponse {
  userId: string;
}
const createUser = async (
  email: string,
  username: string,
  password: string,
): Promise<CreateUserResponse> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });
    const userId = user._id.toString();
    await user.save();
    return { userId };
  } catch (err) {
    throw new Error(err);
  }
};
export default createUser;
