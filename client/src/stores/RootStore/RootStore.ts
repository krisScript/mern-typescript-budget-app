import { create } from 'mobx-persist';
import { createContext } from 'react';
import AuthStore from '../AuthStore/AuthStore';

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});
class RootStore {
  public authStore = new AuthStore();
  public constructor() {
    const hydratedAuthStore = hydrate('authStore', this.authStore);
  }
}

const RootStoreContext = createContext(new RootStore());
export default RootStoreContext;
