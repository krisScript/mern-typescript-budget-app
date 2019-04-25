import User from './User';
interface AuthState {
  isAuth: boolean;
  token: string;
  expiryDate: string;
  user: User;
}
export default AuthState;
