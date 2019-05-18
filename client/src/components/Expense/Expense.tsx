import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useEffect,
  useContext,
} from 'react';
import ExpenseType from '../../interfaces/Expense';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
interface ExpenseProps {
  expense: ExpenseType;
}
const ExpenseProps: FunctionComponent<ExpenseProps> = ({
  expense,
}): JSX.Element => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{expense.title}</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">{expense.description}</div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          {expense.cost}
        </a>
        <Link to={''} className="card-footer-item">
          Edit
        </Link>
        >
        <a href="#" className="card-footer-item">
          Delete
        </a>
      </footer>
    </div>
  );
};

export default ExpenseProps;
