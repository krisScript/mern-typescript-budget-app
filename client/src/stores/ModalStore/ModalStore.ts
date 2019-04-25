import { createContext } from 'react';
import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
class ModalStore {
  @observable public modalState: null | JSX.Element = null;
  @action public setModalState(Component: JSX.Element): void {
    this.modalState = Component;
  }
  @action public resetModalState(): void {
    this.modalState = null;
  }
}

const ModalStoreContext = createContext(new ModalStore());
export { ModalStoreContext };
export default ModalStore;
