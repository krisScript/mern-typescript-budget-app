import AuthState from '../../interfaces/AuthState';
const defaultAuthState: AuthState = {
  isAuth: false,
  token: '',
  user: {
    username: '',
    email: '',
  },
};

export default defaultAuthState;
