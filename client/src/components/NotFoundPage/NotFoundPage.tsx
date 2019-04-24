import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
const NotFoundPage: FunctionComponent<
  RouteComponentProps
> = (): JSX.Element => {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-size-2">404 Not Found!</h1>
          <h2 className="subtitle is-size-3">
            This is not the page you are looking for!
          </h2>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
