import AuthStore from './AuthStore';
import defaultAuthState from './defaultAuthState';
import AuthState from '../../interfaces/AuthState';
describe('AuthStore', (): void => {
  const authStore = new AuthStore();
  it('default', (): void => {
    expect(authStore.authState).toEqual(defaultAuthState);
  });
  it('setAuthState', (): void => {
    const newAuthState: AuthState = {
      isAuth: true,
      token: 'token',
      expiaryDate: '1000',
      user: {
        username: 'testUser',
        email: 'test@mail.com',
        userId: 'userId',
      },
    };
    authStore.setAuthState(newAuthState);
    expect(authStore.authState).toEqual(newAuthState);
  });
  it('resetAuthState', (): void => {
    authStore.resetAuthState();
    expect(authStore.authState).toEqual(defaultAuthState);
  });
});
