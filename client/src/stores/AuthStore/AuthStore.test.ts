import AuthStore from './AuthStore';
import defaultAuthState from './defaultAuthState';
import AuthState from '../../interfaces/AuthState';
describe('AuthStore', (): void => {
  const authStore = new AuthStore();
  it('default', (): void => {
    expect(authStore.authstate).toEqual(defaultAuthState);
  });
  it('setAuthState', (): void => {
    const newAuthState: AuthState = {
      isAuth: true,
      token: 'token',
      user: {
        username: 'testUser',
        email: 'test@mail.com',
      },
    };
    authStore.setAuthState(newAuthState);
    expect(authStore.authstate).toEqual(newAuthState);
  });
  it('resetAuthState', (): void => {
    authStore.resetAuthState();
    expect(authStore.authstate).toEqual(defaultAuthState);
  });
});
