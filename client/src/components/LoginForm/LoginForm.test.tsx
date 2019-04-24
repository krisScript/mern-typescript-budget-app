/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import userEvent from 'user-event';
describe('<LoginFOrm />', () => {
  const email = 'test@mail.com';
  const password = '12345678';
  const mock: any = jest.fn();
  const { getByPlaceholderText, getByValue } = render(
    <LoginForm match={mock} location={mock} history={mock} />,
    {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    },
  );
  beforeEach(() => {
    userEvent.type(getByPlaceholderText('Enter your email'), email);
    userEvent.type(getByPlaceholderText('Enter your password'), password);
  });
  it('should change input values', async () => {
    const emailInput = await waitForElement(() => getByValue(email));
    const passwordInput = await waitForElement(() => getByValue(password));
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
});
