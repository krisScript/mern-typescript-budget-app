import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import RootStoreContext from '../../stores/RootStore/RootStore';
interface NavBarProps {
  isAuth: boolean;
  resetAuthState: () => void;
}
const Navbar: FunctionComponent<NavBarProps> = observer(
  ({ isAuth, resetAuthState }): JSX.Element => {
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
                    onClick={() => resetAuthState()}
                    className="button is-primary"
                    data-testid="logout"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/sign-up"
                      className="button is-primary"
                      data-testid="login"
                    >
                      <strong>Sign up</strong>
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="button is-primary"
                      data-testid="signup"
                    >
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
