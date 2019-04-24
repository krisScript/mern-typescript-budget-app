import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
const LoginForm: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const validationErrorParams: string[] = [];
  const submitHandler = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/auth/login', {
      email,
      password,
    });
    console.log(response);
  };
  return (
    <div className="columns">
      <div className="column is-one-third" />

      <div className="column is-one-third">
        <form className="box" onSubmit={submitHandler}>
          <Input
            name="email"
            value={email}
            setValueHook={setEmail}
            type="email"
            placeholder="Enter your email"
            validationErrorParams={validationErrorParams}
          />
          <Input
            name="password"
            value={password}
            setValueHook={setPassword}
            type="password"
            placeholder="Enter your password"
            validationErrorParams={validationErrorParams}
          />
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Login</button>
            </div>
            <div className="control">
              <button className="button is-text">Forgot your password?</button>
            </div>
          </div>
        </form>
      </div>
      <div className="column is-one-third" />
    </div>
  );
};

export default LoginForm;
