import AuthState from '../../interfaces/AuthState';
const authencticatedAuthState: AuthState = {
  isAuth: true,
  token: 'testToken',
  expiryDate: 'date',
  user: {
    userId: '10',
    username: 'testUser',
    email: 'testEmail@mail.com',
  },
};

export default authencticatedAuthState;
