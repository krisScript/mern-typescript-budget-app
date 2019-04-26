import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import RootStoreContext from '../../stores/RootStore/RootStore';
const HomePage: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const { isAuth } = useContext(RootStoreContext).authStore.authState;
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Manage your Budget now</h1>
          <div className="field is-grouped">
            {isAuth ? (
              <div className="control">
                <Link to={'/create-expense'} className="button is-link">
                  Add New Expense
                </Link>
              </div>
            ) : (
              <>
                {' '}
                <div className="control">
                  <Link to={'/sign-up'} className="button is-link">
                    Sign Up Now
                  </Link>
                </div>
                <div className="control">
                  <Link to={'/login'} className="button is-primary">
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
