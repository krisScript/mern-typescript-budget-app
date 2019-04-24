import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
const HomePage: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Manage your Budget now</h1>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Sign Up Now</button>
            </div>
            <div className="control">
              <button className="button is-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
