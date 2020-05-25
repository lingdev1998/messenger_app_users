import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication, { AuthenticationState } from './authentication';

import role, { RoleState } from './role';
import user, { UserState } from './user';
import messengerReducer, { MessengerReducer } from '../views/Messenger/reducer/MessengerReducer';
export interface IRootState {
  readonly loadingBar: any;
  readonly authentication: AuthenticationState;
  readonly role: RoleState;
  readonly user: UserState;
  messengerReducer: MessengerReducer
}

const rootReducer = combineReducers<IRootState>({
  loadingBar,
  authentication,
  role,
  user,
  messengerReducer
});

export default rootReducer;
