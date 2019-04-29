import React, { FunctionComponent, Suspense, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../Loader';
import { observer } from 'mobx-react-lite';
import RootStoreContext from '../../stores/RootStore/RootStore';
interface ProtectedRouteProps {
  Component: FunctionComponent;
  path: string;
}
const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = observer(
  ({ Component, ...rest }): JSX.Element => {
    const { authStore } = useContext(RootStoreContext);
    console.log(authStore);
    return (
      <Route
        {...rest}
        render={(props): JSX.Element => {
          if (authStore.authState.isAuth) {
            return (
              <Suspense fallback={<Loader />}>
                <Component />
              </Suspense>
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    );
  },
);
export default ProtectedRoute;
