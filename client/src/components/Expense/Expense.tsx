import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useEffect,
  useContext,
} from 'react';
import axios from 'axios';
import ExpenseType from '../../interfaces/Expense';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import RootStoreContext from '../../stores/RootStore/RootStore';
interface ExpenseProps {
  expense: ExpenseType;
  deleteExpenseComponentHandler: (expenseId: string) => void;
}

const Expense: FunctionComponent<ExpenseProps> = observer(
  ({ expense, deleteExpenseComponentHandler }): JSX.Element => {
    const { authStore } = useContext(RootStoreContext);
    const deleteExpenseHandler = async () => {
      try {
        const { token } = authStore.authState;
        const config = {
          headers: { Authorization: 'bearer ' + token },
        };
        const response = await axios.delete(
          `http://localhost:8080/expense/${expense._id}`,
          config,
        );
        if (response.status === 200) {
        }
        deleteExpenseComponentHandler(expense._id);
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div className="column is-one-quarter">
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
            <Link
              to={{
                pathname: '/edit/expense',
                state: { expense: JSON.stringify(expense) },
              }}
              className="card-footer-item"
            >
              Edit
            </Link>

            <button onClick={deleteExpenseHandler} className="card-footer-item">
              Delete
            </button>
          </footer>
        </div>
      </div>
    );
  },
);

export default Expense;
