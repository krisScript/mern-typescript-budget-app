import React, {
  useState,
  useMemo,
  FunctionComponent,
  SetStateAction,
  Dispatch,
} from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  type: string;
  validationErrorParams: string[];
  setValueHook: Dispatch<SetStateAction<string>>;
}
const Input: FunctionComponent<InputProps> = ({
  name,
  placeholder,
  value,
  type,
  setValueHook,
  validationErrorParams,
}): JSX.Element => {
  const error = useMemo(() => validationErrorParams.includes(name), [
    validationErrorParams,
    name,
  ]);
  return (
    <div className="field">
      <label className="label">{placeholder}</label>
      <div className="control">
        <input
          className={`input${error ? ' is-danger' : ''}`}
          onChange={e => setValueHook(e.target.value)}
          value={value}
          type={type}
          placeholder={placeholder}
          name={name}
          required
        />
      </div>
    </div>
  );
};
export default Input;
