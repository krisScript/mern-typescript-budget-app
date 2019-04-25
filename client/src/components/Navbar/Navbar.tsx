import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import RootStoreContext from '../../stores/RootStore/RootStore';
const Navbar: FunctionComponent = observer(
  (): JSX.Element => {
    const { authStore } = useContext(RootStoreContext);
    const { isAuth } = authStore.authState;
    return (
      <nav className="navbar ">
        <div className="navbar-menu is-active">
          <NavLink to="/add-expense" className="navbar-item">
            Add Expense
          </NavLink>
          <NavLink to="/expenses" className="navbar-item">
            View Expenses
          </NavLink>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isAuth ? (
                  <button
                    onClick={() => authStore.resetAuthState()}
                    className="button is-primary"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink to="/sign-up" className="button is-primary">
                      <strong>Sign up</strong>
                    </NavLink>
                    <NavLink to="/login" className="button is-primary">
                      <strong>Login</strong>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  },
);

export default Navbar;
