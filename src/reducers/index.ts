import { combineReducers } from 'redux';
import { dialogsReducer } from './dialogs';
import { messagesReducer } from './messages';
import { sendMessageReducer } from './sendMessage';
import { userReducer } from './user';
import { usersReducer } from './users';

export const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  messages: messagesReducer,
  sendMessage: sendMessageReducer,
  dialogs: dialogsReducer,
});
