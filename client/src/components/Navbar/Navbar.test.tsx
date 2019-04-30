import React, { createContext } from 'react';
import { render, cleanup, fireEvent, getByTestId } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { RootStore } from '../../stores/RootStore/RootStore';
import authenticatedAuthState from '../../stores/AuthStore/authenticatedAuthState';
const rootStore = new RootStore();
rootStore.authStore.setAuthState(authenticatedAuthState);
const Context = createContext(rootStore);
// , {
//   wrapper: ({ children }) => (
//     <BrowserRouter>
//       <Context.Provider value={rootStore}>{children}</Context.Provider>
//     </BrowserRouter>
//   ),
// }

describe('<Navbar />', (): void => {
  const { container, rerender, queryByTestId, getByText } = render(<Navbar />, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  });

  it('snapshot', (): void => {
    expect(container).toMatchSnapshot();
  });
  it('should have Login and SignUp links if isAuth is false', async (): Promise<
    void
  > => {
    const LoginLink = queryByTestId('login');
    const SignUpLink = queryByTestId('signup');
    const LogoutLink = queryByTestId('logout');
    expect(LoginLink).toBeTruthy();
    expect(SignUpLink).toBeTruthy();
    expect(LogoutLink).toBeNull();
  });
  // it('should have logout if isAuth is true', (): void => {
  //   const LoginLink = queryByTestId('login');
  //   const SignUpLink = queryByTestId('signup');
  //   const LogoutLink = queryByTestId('logout');
  //   expect(LoginLink).toBeTruthy();
  //   expect(SignUpLink).toBeTruthy();
  //   expect(LogoutLink).toBeNull();
  // });
});
