import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useEffect,
  useContext,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Expense from '../../interfaces/Expense';
import axios from 'axios';
import Input from '../Input/Input';
import ValidationErrorsNotification from '../ValidationErrorsNotification/ValidationErrorsNotification';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import RootStoreContext from '../../stores/RootStore/RootStore';
import { observer } from 'mobx-react-lite';

interface MatchParams {
  expense: string;
}

const ExpenseForm: FunctionComponent<
  RouteComponentProps<MatchParams>
> = observer(
  ({ history, match }): JSX.Element => {
    const {
      validationErrorMessages,
      validationErrorParams,
      toggleValidationErrors,
    } = useValidationErrors();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [expenseId, setExpenseId] = useState<string | undefined>('');
    const [userId, setUserId] = useState<string | undefined>('');
    const { authStore } = useContext(RootStoreContext);
    useEffect(() => {
      if (match.path === '/edit/expense') {
        const expense: Expense = JSON.parse(history.location.state.expense);

        setTitle(expense.title);
        setDescription(expense.description);
        setCost(expense.cost.toString());
        setExpenseId(expense._id);
        setUserId(expense.userId);
      }
    }, []);

    const submitHandler = async (e: SyntheticEvent): Promise<void> => {
      e.preventDefault();
      try {
        const { token } = authStore.authState;
        const config = {
          headers: { Authorization: 'bearer ' + token },
        };
        let body = {
          title,
          description,
          cost,
        };
        let response;
        if (match.path === '/edit/expense') {
          response = await axios.put(
            `http://localhost:8080/expense/${expenseId}`,
            body,
            config,
          );
        } else {
          response = await axios.post(
            'http://localhost:8080/expense',
            body,
            config,
          );
        }
        if (response.status === 200 || response.status === 201) {
          history.replace('/expenses');
        }
      } catch (err) {
        toggleValidationErrors(err.response.data.data);
      }
    };
    return (
      <div className="columns">
        <div className="column is-one-third">
          <ValidationErrorsNotification
            validationErrorMessages={validationErrorMessages}
          />
          <form className="box" onSubmit={submitHandler}>
            <Input
              name="title"
              value={title}
              setValueHook={setTitle}
              type="text"
              placeholder="Title"
              validationErrorParams={validationErrorParams}
            />
            <Input
              name="description"
              value={description}
              setValueHook={setDescription}
              type="text"
              placeholder="Description"
              validationErrorParams={validationErrorParams}
            />
            <Input
              name="cost"
              value={cost}
              setValueHook={setCost}
              type="number"
              placeholder="Cost"
              validationErrorParams={validationErrorParams}
            />
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">
                  {match.path === '/edit/expense'
                    ? 'Edit Expense'
                    : 'Add Expense'}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-one-third" />
      </div>
    );
  },
);

export default withRouter(ExpenseForm);
