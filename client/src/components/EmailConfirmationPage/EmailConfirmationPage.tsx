import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Loader from '../Loader';
interface MatchParams {
  token: string;
}

const EmailConfirmationPage: FunctionComponent<
  RouteComponentProps<MatchParams>
> = ({ match }): JSX.Element => {
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [confirmationFail, setConfirmationFail] = useState<boolean>(false);
  useEffect((): void => {
    const { token } = match.params;
    console.log(token);
    axios
      .post(`http://localhost:8080/auth/confirmation/${token}`)
      .then(
        (response: AxiosResponse): void => {
          console.log(response.data);
          setConfirmation(response.data.confirmed);
        },
      )
      .catch(
        (error: AxiosError): void => {
          console.log(error.message);
        },
      );
  }, []);

  return (
    <>
      {confirmation ? (
        <div className="columns">
          <div className="column is-one-third" />
          <div className="column is-one-third box has-text-centered">
            <h1 className="is-size-2">
              {confirmationFail
                ? 'Email confirmation was not successfully'
                : 'Email Confirmed'}
            </h1>
            <div className="field ">
              <div className="control">
                <button className="button is-primary">Login</button>
              </div>
            </div>
          </div>
          <div className="column is-one-third" />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EmailConfirmationPage;
