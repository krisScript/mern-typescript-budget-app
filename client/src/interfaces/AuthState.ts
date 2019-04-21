import User from './User';
interface AuthState {
  isAuth: boolean;
  token: string;
  user: User;
}
export default AuthState;
