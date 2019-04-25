import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useContext,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import RootStoreContext from '../../stores/RootStore/RootStore';
import { observer } from 'mobx-react-lite';
const LoginForm: FunctionComponent<RouteComponentProps> = observer(
  (): JSX.Element => {
    const { modalStore } = useContext(RootStoreContext);
    return (
      <div className="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">{modalStore.modalState}</section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  },
);

export default LoginForm;
