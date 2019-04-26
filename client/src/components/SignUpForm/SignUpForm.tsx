import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import ValidationErrorsNotification from '../ValidationErrorsNotification/ValidationErrorsNotification';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
const SignUpForm: FunctionComponent<RouteComponentProps> = ({
  history,
}): JSX.Element => {
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors,
  } = useValidationErrors();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [matchPassword, setMatchPassword] = useState<string>('');
  const submitHandler = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/sign-up', {
        username,
        email,
        password,
        matchPassword,
      });
      history.replace('/login');
    } catch (err) {
      console.log(err);
      // if (err.response.data) {
      //   toggleValidationErrors(err.response.data.data);
      // }
    }
  };
  return (
    <div className="columns">
      <div className="column is-one-third" />
      <div className="column is-one-third">
        <ValidationErrorsNotification
          validationErrorMessages={validationErrorMessages}
        />
        <form className="box" onSubmit={submitHandler}>
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
          <Input
            name="matchPassword"
            value={matchPassword}
            setValueHook={setMatchPassword}
            type="password"
            placeholder="Repeat your password"
            validationErrorParams={validationErrorParams}
          />
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Sign Up</button>
            </div>
            <div className="control">
              <button className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
      </div>
      <div className="column is-one-third" />
    </div>
  );
};

export default withRouter(SignUpForm);
