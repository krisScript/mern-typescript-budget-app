import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useEffect,
  useContext,
} from 'react';
import RootStoreContext from '../../stores/RootStore/RootStore';
import ExpenseType from '../../interfaces/Expense';
import Expense from '../Expense/Expense';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
const ExpensesContainer: FunctionComponent = observer(
  (): JSX.Element => {
    const { authStore } = useContext(RootStoreContext);
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);
    useEffect(() => {
      const { token } = authStore.authState;
      const config = {
        headers: { Authorization: 'bearer ' + token },
      };
      console.log(config);
      axios
        .get('http://localhost:8080/expenses', config)
        .then(response => {
          setExpenses(response.data.expenses);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);
    return (
      <div className="section columns">
        {expenses.map(expense => (
          <Expense key={expense._id} expense={expense} />
        ))}
      </div>
    );
  },
);

export default ExpensesContainer;
