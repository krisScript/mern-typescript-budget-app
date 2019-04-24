import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
const EmailConfirmationPage: FunctionComponent<RouteComponentProps> = (
  props,
): JSX.Element => {
  console.log(props);
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
