/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import userEvent from 'user-event';
describe('<SignUpForm />', () => {
  const username = 'newUser';
  const email = 'test@mail.com';
  const password = '12345678';
  const matchPassword = '87654321';
  const mock: any = jest.fn();
  const { getByPlaceholderText, getByValue } = render(
    <SignUpForm match={mock} location={mock} history={mock} />,
    {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    },
  );
  beforeEach(() => {
    userEvent.type(getByPlaceholderText('Enter your username'), username);
    userEvent.type(getByPlaceholderText('Enter your email'), email);
    userEvent.type(getByPlaceholderText('Enter your password'), password);
    userEvent.type(getByPlaceholderText('Repeat your password'), matchPassword);
  });
  it('should change input values', async () => {
    const usernameInput = await waitForElement(() => getByValue(username));
    const emailInput = await waitForElement(() => getByValue(email));
    const passwordInput = await waitForElement(() => getByValue(password));
    const matchPasswordInput = await waitForElement(() =>
      getByValue(matchPassword),
    );
    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(matchPasswordInput).toBeTruthy();
  });

  describe('submittig', async () => {
    beforeEach(() => {});
  });
});
