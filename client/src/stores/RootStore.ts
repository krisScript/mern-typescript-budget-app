import { create } from 'mobx-persist';
import { createContext } from 'react';
import AuthStore from './AuthStore/AuthStore';
export class RootStore {
  public authStore = new AuthStore();
}

const RootStoreContext = createContext(new RootStore());
export default RootStoreContext;
