import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useContext,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import RootStoreContext from '../../stores/RootStore/RootStore';
import { observer } from 'mobx-react-lite';
const Modal: FunctionComponent = observer(
  (): JSX.Element => {
    const { modalStore } = useContext(RootStoreContext);
    return (
      <>
        {modalStore.modalState ? (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Modal title</p>
                <button
                  onClick={() => modalStore.resetModalState()}
                  className="delete"
                  aria-label="close"
                />
              </header>
              <section className="modal-card-body">
                {modalStore.modalState}
              </section>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  },
);

export default Modal;
