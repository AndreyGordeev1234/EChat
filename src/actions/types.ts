import {
  ADD_MESSAGE,
  FETCH_AUTH,
  FETCH_AUTH_FAILURE,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_DIALOGS,
  FETCH_DIALOGS_FAILURE,
  FETCH_DIALOGS_REQUEST,
  FETCH_DIALOGS_SUCCESS,
  FETCH_MESSAGES,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_SEND_MESSAGE,
  FETCH_SEND_MESSAGE_FAILURE,
  FETCH_SEND_MESSAGE_REQUEST,
  FETCH_SEND_MESSAGE_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  LOAD_USER,
} from '../constraints/ActionTypes';
import { Dialog, DialogInfo, Message, User } from '../reducers/types';
import firebase from 'firebase/app';

export interface UserRequestAction {
  type: typeof FETCH_AUTH_REQUEST;
}

export interface UserLoadedAction {
  type: typeof FETCH_AUTH_SUCCESS;
  payload: User;
}

export interface UserErrorAction {
  type: typeof FETCH_AUTH_FAILURE;
  payload: any;
}

export interface UserFetchAction {
  type: typeof FETCH_AUTH;
  payload: firebase.auth.Auth;
}

export interface LoadUserAction {
  type: typeof LOAD_USER;
  payload: User;
}

export type UserActionTypes =
  | UserRequestAction
  | UserLoadedAction
  | UserErrorAction
  | UserFetchAction
  | LoadUserAction;

export interface UsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

export interface UsersLoadedAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: User[];
}

export interface UsersErrorAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: any;
}

export interface UsersFetchAction {
  type: typeof FETCH_USERS;
}

export type UsersActionTypes =
  | UsersRequestAction
  | UsersLoadedAction
  | UsersErrorAction
  | UsersFetchAction;

export interface MessagesRequestedAction {
  type: typeof FETCH_MESSAGES_REQUEST;
}

export interface MessagesLoadedAction {
  type: typeof FETCH_MESSAGES_SUCCESS;
  payload: Dialog;
}

export interface MessagesErrorAction {
  type: typeof FETCH_MESSAGES_FAILURE;
  payload: any;
}

export interface MessagesFetchAction {
  type: typeof FETCH_MESSAGES;
  payload: {
    from: string;
    to: string;
  };
}

export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: Message;
}

export type MessagesActionTypes =
  | MessagesRequestedAction
  | MessagesLoadedAction
  | MessagesErrorAction
  | MessagesFetchAction
  | AddMessageAction;

export interface SendMessageRequestAction {
  type: typeof FETCH_SEND_MESSAGE_REQUEST;
}

export interface SendMessageLoadedAction {
  type: typeof FETCH_SEND_MESSAGE_SUCCESS;
}

export interface SendMessageErrorAction {
  type: typeof FETCH_SEND_MESSAGE_FAILURE;
  payload: any;
}

export interface SendMessageFetchAction {
  type: typeof FETCH_SEND_MESSAGE;
  payload: {
    from: string;
    to: string;
    message: string;
  };
}

export type SendMessageActionTypes =
  | SendMessageRequestAction
  | SendMessageLoadedAction
  | SendMessageErrorAction
  | SendMessageFetchAction;

export interface DialogsRequestAction {
  type: typeof FETCH_DIALOGS_REQUEST;
}

export interface DialogsLoadedAction {
  type: typeof FETCH_DIALOGS_SUCCESS;
  payload: DialogInfo[];
}

export interface DialogsErrorAction {
  type: typeof FETCH_DIALOGS_FAILURE;
  payload: any;
}

export interface DialogsFetchAction {
  type: typeof FETCH_DIALOGS;
  payload: string;
}

export type DialogsActionTypes =
  | DialogsRequestAction
  | DialogsLoadedAction
  | DialogsErrorAction
  | DialogsFetchAction;
