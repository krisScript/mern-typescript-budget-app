import React, { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Loader from '../../Loader';
import Navbar from '../Navbar/Navbar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
const SignUpForm = lazy(() => import('../SignUpForm/SignUpForm'));
const HomePage = lazy(() => import('../HomePage/HomePage'));
const Router: FunctionComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Switch>
          <Route
            path="/sign-up"
            render={(props): JSX.Element => (
              <Suspense fallback={<Loader />}>
                <SignUpForm {...props} />
              </Suspense>
            )}
          />
          <Route
            exact
            path="/"
            render={(props): JSX.Element => (
              <Suspense fallback={<Loader />}>
                <HomePage {...props} />
              </Suspense>
            )}
          />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default Router;
