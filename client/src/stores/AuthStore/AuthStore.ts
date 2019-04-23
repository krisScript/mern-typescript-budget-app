import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import AuthState from '../../interfaces/AuthState';
import defaultAuthState from './defaultAuthState';
class AuthStore {
  @persist @observable public authState: AuthState = defaultAuthState;
  @action public setAuthState(newAuthState: AuthState): void {
    this.authState = newAuthState;
  }
  @action public resetAuthState(): void {
    this.authState = defaultAuthState;
  }
}

export default AuthStore;
