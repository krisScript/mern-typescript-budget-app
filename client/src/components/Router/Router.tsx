import React, { FunctionComponent, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Loader from '../../Loader';
import Navbar from '../Navbar/Navbar';
import Modal from '../Modal/Modal';
import { observer } from 'mobx-react-lite';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import RootStoreContext from '../../stores/RootStore/RootStore';
const SignUpForm = lazy(() => import('../SignUpForm/SignUpForm'));
const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const HomePage = lazy(() => import('../HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../NotFoundPage/NotFoundPage'));
const ExpenseForm = lazy(() => import('../ExpenseForm/ExpenseForm'));
const ExpensesContainer = lazy(() =>
  import('../ExpensesContainer/ExpensesContainer'),
);
const EmailConfirmationPage = lazy(() =>
  import('../EmailConfirmationPage/EmailConfirmationPage'),
);
const Router: FunctionComponent = observer(
  (): JSX.Element => {
    const { authStore } = useContext(RootStoreContext);
    const { isAuth } = authStore.authState;
    return (
      <BrowserRouter>
        <>
          <Navbar
            isAuth={isAuth}
            resetAuthState={() => authStore.resetAuthState()}
          />
          <Modal />
          <Switch>
            <ProtectedRoute Component={ExpenseForm} path={'/new/expense'} />
            <ProtectedRoute Component={ExpenseForm} path={'/edit/expense'} />
            <ProtectedRoute Component={ExpensesContainer} path={'/expenses'} />
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
  },
);

export default Router;
