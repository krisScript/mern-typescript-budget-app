import React, { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Loader from '../../Loader';
import Navbar from '../Navbar/Navbar';
import Modal from '../Modal/Modal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
const SignUpForm = lazy(() => import('../SignUpForm/SignUpForm'));
const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const HomePage = lazy(() => import('../HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../NotFoundPage/NotFoundPage'));
const EmailConfirmationPage = lazy(() =>
  import('../EmailConfirmationPage/EmailConfirmationPage'),
);
const Router: FunctionComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Modal />
        <Switch>
          <ProtectedRoute Component={LoginForm} path={'/protected'} />
          <Route
            path="/login"
            render={(props): JSX.Element => (
              <Suspense fallback={<Loader />}>
                <LoginForm {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/auth/confirmation/:token"
            render={(props): JSX.Element => (
              <Suspense fallback={<Loader />}>
                <EmailConfirmationPage {...props} />
              </Suspense>
            )}
          />
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
          <Route
            exact
            render={(props): JSX.Element => (
              <Suspense fallback={<Loader />}>
                <NotFoundPage {...props} />
              </Suspense>
            )}
          />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default Router;
