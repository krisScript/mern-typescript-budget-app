import React, { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Loader from '../../Loader';
import Navbar from '../Navbar/Navbar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
const SignUpForm = lazy(() => import('../SignUpForm/SignUpForm'));
// const Home = lazy(() => import('./Home'));
const Router: FunctionComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="main-container">
          <Switch>
            <Route
              path="/sign-up"
              render={(props): JSX.Element => (
                <Suspense fallback={<Loader />}>
                  <SignUpForm {...props} />
                </Suspense>
              )}
            />
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
};

export default Router;
