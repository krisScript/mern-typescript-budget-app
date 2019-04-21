import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar: FunctionComponent = (): JSX.Element => {
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
              <NavLink to="/sign-up" className="button is-primary">
                <strong>Sign up</strong>
              </NavLink>
              <NavLink to="/login" className="button is-primary">
                <strong>Login</strong>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
