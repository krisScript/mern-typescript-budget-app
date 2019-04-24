import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import ValidationErrorsNotification from './ValidationErrorsNotification';

describe('<ValidationErrorsNotification />', () => {
  const validationErrorsMessages: string[] = [];
  const { container, rerender, queryByTestId, getByTestId } = render(
    <ValidationErrorsNotification
      validationErrorMessages={validationErrorsMessages}
    />,
  );

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });
  it('errors-list', async () => {
    const errorsList = queryByTestId('error-list');
    expect(errorsList).toBeNull();
    const newErrorsList = ['Email is already taken!', 'Wrong Password!'];
    rerender(
      <ValidationErrorsNotification validationErrorMessages={newErrorsList} />,
    );
    const rerenderedErrorsList = getByTestId('error-list');
    expect(rerenderedErrorsList.childElementCount).toBe(2);
  });
});
