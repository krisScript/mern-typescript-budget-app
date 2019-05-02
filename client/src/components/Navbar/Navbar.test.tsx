import React, { createContext } from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
describe('<Navbar />', (): void => {
  const resetAuthState = jest.fn();
  const { container, rerender, queryByTestId, getByText, getByTestId } = render(
    <Navbar isAuth={false} resetAuthState={resetAuthState} />,
    {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    },
  );

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
  it('should have logout if isAuth is true', (): void => {
    rerender(<Navbar isAuth={true} resetAuthState={resetAuthState} />);
    const LoginLink = queryByTestId('login');
    const SignUpLink = queryByTestId('signup');
    const LogoutLink = getByTestId('logout');
    expect(LoginLink).toBeNull();
    expect(SignUpLink).toBeNull();
    expect(LogoutLink).toBeTruthy();
    fireEvent.click(LogoutLink);
    expect(resetAuthState).toBeCalledTimes(1);
  });
});
