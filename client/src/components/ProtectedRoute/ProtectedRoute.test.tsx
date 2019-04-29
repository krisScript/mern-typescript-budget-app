import React, { FunctionComponent } from 'react';
import { render, cleanup, fireEvent, getByTestId } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Redirect as MockRedirect } from 'react-router-dom';
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  };
});

const MockComponent: FunctionComponent = (): JSX.Element => <div>Mock</div>;
describe('<ProtectedRoute />', () => {
  const { container, rerender, queryByTestId, getByTestId } = render(
    <ProtectedRoute Component={MockComponent} path={'/mock'} />,
    { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
  );
  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });
  it('should redirect', async () => {
    expect(container.childElementCount).toBe(2);
  });
});
