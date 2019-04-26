import { createContext } from 'react';
import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import ModalState from '../../interfaces/ModalState';
import defaultModalState from './defaultModalState';
class ModalStore {
  @observable public modalState: ModalState = {
    on: false,
    Component: null,
    title: '',
  };
  @action public setModalState(Component: JSX.Element, title: string): void {
    this.modalState.Component = Component;
    this.modalState.title = title;
    this.modalState.on = true;
  }
  @action public resetModalState(): void {
    this.modalState = defaultModalState;
  }
}

const ModalStoreContext = createContext(new ModalStore());
export { ModalStoreContext };
export default ModalStore;
