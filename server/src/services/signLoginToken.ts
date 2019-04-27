import jwt from 'jsonwebtoken';
import User from '../interfaces/User';
const signLoginToken = (user: User) => {
  const secret: any = process.env.SECRET;
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    secret,
    { expiresIn: '1h' },
  );
  return token;
};
export default signLoginToken;
