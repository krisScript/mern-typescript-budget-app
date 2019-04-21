import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
class ModalStore {
  @persist @observable public modalState: null | JSX.Element = null;
  @action public setModalState(Component: JSX.Element): void {
    this.modalState = Component;
  }
  @action public restModalComponent(): void {
    this.modalState = null;
  }
}

export default ModalStore;
