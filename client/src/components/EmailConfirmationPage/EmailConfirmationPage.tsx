import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
interface MatchParams {
  token: string;
}

const EmailConfirmationPage: FunctionComponent<
  RouteComponentProps<MatchParams>
> = ({ match }): JSX.Element => {
  useEffect((): void => {
    const { token } = match.params;
    console.log(token);
    axios
      .post(`http://localhost:8080/auth/confirmation/${token}`)
      .then(
        (response: AxiosResponse): void => {
          console.log(response);
        },
      )
      .catch(
        (error: AxiosError): void => {
          console.log(error);
        },
      );
  }, []);

  return (
    <div className="columns">
      <div className="column is-one-third" />
      <div className="column is-one-third box has-text-centered">
        <h1 className="is-size-2">Email confirmation finished</h1>
        <div className="field ">
          <div className="control">
            <button className="button is-primary">Login</button>
          </div>
        </div>
      </div>
      <div className="column is-one-third" />
    </div>
  );
};

export default EmailConfirmationPage;
