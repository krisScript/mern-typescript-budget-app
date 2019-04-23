import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
const SignUpForm: FunctionComponent = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [matchPassword, setMatchPassword] = useState<string>('');
  const validationErrorParams: string[] = [];
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        name="username"
        value={username}
        setValueHook={setUsername}
        type="text"
        placeholder="Enter your username"
        validationErrorParams={validationErrorParams}
      />
      <Input
        name="email"
        value={username}
        setValueHook={setUsername}
        type="email"
        placeholder="Enter your email"
        validationErrorParams={validationErrorParams}
      />
      <Input
        name="password"
        value={username}
        setValueHook={setUsername}
        type="password"
        placeholder="Enter your password"
        validationErrorParams={validationErrorParams}
      />
      <Input
        name="matchPassword"
        value={username}
        setValueHook={setUsername}
        type="password"
        placeholder="Repeat your username"
        validationErrorParams={validationErrorParams}
      />
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-text">Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
