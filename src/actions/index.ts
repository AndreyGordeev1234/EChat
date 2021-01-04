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
import {
  AddMessageAction,
  DialogsRequestAction,
  LoadUserAction,
  MessagesErrorAction,
  MessagesFetchAction,
  MessagesLoadedAction,
  MessagesRequestedAction,
  SendMessageErrorAction,
  SendMessageFetchAction,
  SendMessageLoadedAction,
  SendMessageRequestAction,
  UserErrorAction,
  UserFetchAction,
  UserLoadedAction,
  UserRequestAction,
  UsersErrorAction,
  UsersFetchAction,
  UsersLoadedAction,
  UsersRequestAction,
} from './types';
import firebase from 'firebase/app';

export const userRequested = (): UserRequestAction => ({
  type: FETCH_AUTH_REQUEST,
});

export const userLoaded = (user: User): UserLoadedAction => ({
  type: FETCH_AUTH_SUCCESS,
  payload: user,
});

export const userError = (error: any): UserErrorAction => ({
  type: FETCH_AUTH_FAILURE,
  payload: error,
});

export const fetchUser = (auth: firebase.auth.Auth): UserFetchAction => ({
  type: FETCH_AUTH,
  payload: auth,
});

export const loadUser = (user: User): LoadUserAction => ({
  type: LOAD_USER,
  payload: user,
});

export const usersRequested = (): UsersRequestAction => ({
  type: FETCH_USERS_REQUEST,
});

export const usersLoaded = (users: User[]): UsersLoadedAction => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const usersError = (error: any): UsersErrorAction => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = (): UsersFetchAction => ({
  type: FETCH_USERS,
});

export const messagesRequested = (): MessagesRequestedAction => ({
  type: FETCH_MESSAGES_REQUEST,
});

export const messagesLoaded = (dialog: Dialog): MessagesLoadedAction => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: dialog,
});

export const messagesError = (error: any): MessagesErrorAction => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: error,
});

export const addMessage = (message: Message): AddMessageAction => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const fetchMessages = (
  from: string,
  to: string,
): MessagesFetchAction => ({
  type: FETCH_MESSAGES,
  payload: { from, to },
});

export const sendMessageRequested = (): SendMessageRequestAction => ({
  type: FETCH_SEND_MESSAGE_REQUEST,
});

export const sendMessageLoaded = (): SendMessageLoadedAction => ({
  type: FETCH_SEND_MESSAGE_SUCCESS,
});

export const sendMessageError = (error: any): SendMessageErrorAction => ({
  type: FETCH_SEND_MESSAGE_FAILURE,
  payload: error,
});

export const fetchSendMessage = (
  from: string,
  to: string,
  message: string,
): SendMessageFetchAction => ({
  type: FETCH_SEND_MESSAGE,
  payload: { from, to, message },
});

export const dialogsRequested = (): DialogsRequestAction => ({
  type: FETCH_DIALOGS_REQUEST,
});

export const dialogsLoaded = (dialogs: DialogInfo[]) => ({
  type: FETCH_DIALOGS_SUCCESS,
  payload: dialogs,
});

export const dialogsError = (error: any) => ({
  type: FETCH_DIALOGS_FAILURE,
  payload: error,
});

export const fetchDialogs = (user: string) => ({
  type: FETCH_DIALOGS,
  payload: user,
});
