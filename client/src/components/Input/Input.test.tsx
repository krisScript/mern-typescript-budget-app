/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { render, fireEvent } from 'react-testing-library';
import Input from './Input';

describe('<Input />', () => {
  const setValueHook = jest.fn();
  const value = 'John Doe';
  const type = 'text';
  const placeholder = 'Test Placeholder';
  const name = 'username';
  const userInputValue = 'newUsername';
  let validationErrorParams: string[] = [];
  const { container, getByPlaceholderText, rerender } = render(
    <Input
      setValueHook={setValueHook}
      value={value}
      type={type}
      placeholder={placeholder}
      validationErrorParams={validationErrorParams}
      name={name}
    />,
  );
  it('should render', async () => {
    const inputElement = getByPlaceholderText(placeholder) as HTMLInputElement;
    expect(inputElement).toBeTruthy;
    expect(inputElement.value).toEqual(value);
    expect(inputElement.className).toEqual('input');
    expect(inputElement.type).toEqual(type);
    expect(inputElement.name).toEqual(name);
  });
  describe('onChange Event', () => {
    beforeEach(() => {
      const inputElement = getByPlaceholderText(
        placeholder,
      ) as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: userInputValue } });
    });
    it('setValueHook should be called', () => {
      expect(setValueHook).toBeCalled();
      expect(setValueHook).toBeCalledTimes(1);
    });
  });
});
