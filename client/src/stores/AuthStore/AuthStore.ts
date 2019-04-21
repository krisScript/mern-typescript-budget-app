import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import AuthState from '../../interfaces/AuthState';
import defaultAuthState from './defaultAuthState';
class AuthStore {
  @persist @observable public authstate: AuthState = defaultAuthState;
  @action public setAuthState(newAuthState: AuthState): void {
    this.authstate = newAuthState;
  }
  @action public resetAuthState(): void {
    this.authstate = defaultAuthState;
  }
}

export default AuthStore;
