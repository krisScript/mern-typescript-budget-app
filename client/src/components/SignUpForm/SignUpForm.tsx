import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
const SignUpForm: FunctionComponent = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [matchPassword, setMatchPassword] = useState<string>('');
  const validationErrorParams: string[] = [];
  return (
    <form>
      <Input
        name="username"
        value={username}
        setValueHook={setUsername}
        type="text"
        placeholder="Enter your username"
        validationErrorParams={validationErrorParams}
      />
    </form>
  );
};

export default SignUpForm;
