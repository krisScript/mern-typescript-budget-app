import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useContext,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import ValidationErrorsNotification from '../ValidationErrorsNotification/ValidationErrorsNotification';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import AuthState from '../../interfaces/AuthState';
// import { AuthStoreContext } from '../../stores/AuthStore/AuthStore';
import RootStoreContext from '../../stores/RootStore/RootStore';
import { observer } from 'mobx-react-lite';
const LoginForm: FunctionComponent<RouteComponentProps> = observer(
  (): JSX.Element => {
    const { authStore } = useContext(RootStoreContext);
    const {
      validationErrorMessages,
      validationErrorParams,
      toggleValidationErrors,
    } = useValidationErrors();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const submitHandler = async (e: SyntheticEvent): Promise<void> => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/auth/login', {
          email,
          password,
        });
        const { token, user } = response.data;
        console.log(user);
        const remainingMilliseconds = 10000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds,
        ).toISOString();
        const newAuthState: AuthState = {
          token,
          user,
          isAuth: true,
          expiryDate,
        };
        authStore.setAuthState(newAuthState);
      } catch (err) {
        if (err) {
          toggleValidationErrors(err.response.data.data);
          if (err.response.data.data[0].param === 'confirmed') {
            console.log('nani');
          }
        }
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
                <button className="button is-text">
                  Forgot your password?
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-one-third" />
      </div>
    );
  },
);

export default LoginForm;
