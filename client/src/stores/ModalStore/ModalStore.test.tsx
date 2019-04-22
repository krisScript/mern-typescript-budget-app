import React, { FunctionComponent } from 'react';
import ModalStore from './ModalStore';
const TestComponent: FunctionComponent = (): JSX.Element => (
  <div className="test-component">Test</div>
);
describe('ModalStore', (): void => {
  const modalStore = new ModalStore();
  it('default', (): void => {
    expect(modalStore.modalState).toEqual(null);
  });
  it('setModalState', (): void => {
    modalStore.setModalState(<TestComponent />);
    expect(modalStore.modalState).toEqual(<TestComponent />);
  });
  it('resetAuthState', (): void => {
    modalStore.resetModalState();
    expect(modalStore.modalState).toEqual(null);
  });
});
