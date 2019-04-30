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
    const { authStore } = useContext(RootStoreContext);
    const { isAuth, token } = authStore.authState;
    return <div data-testid="test-c">{token}</div>;
  },
);

export default Modal;
