import * as actions from './index';
import * as types from '../constraints/ActionTypes';
import { Dialog, DialogInfo, Message, User } from '../reducers/types';
import {
  DialogsErrorAction,
  DialogsFetchAction,
  DialogsLoadedAction,
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

describe('actions', () => {
  it('should create an action to request user', () => {
    const expectedAction: UserRequestAction = {
      type: types.FETCH_AUTH_REQUEST,
    };

    expect(actions.userRequested()).toEqual(expectedAction);
  });

  it('should create an action on user loaded', () => {
    const user: User = {
      email: 'testEmail',
      name: 'testName',
      photoUrl: 'testUrl',
    };
    const expectedAction: UserLoadedAction = {
      type: types.FETCH_AUTH_SUCCESS,
      payload: user,
    };

    expect(actions.userLoaded(user)).toEqual(expectedAction);
  });

  it('should create an action on user error', () => {
    const error: any = 'test error';
    const expectedAction: UserErrorAction = {
      type: types.FETCH_AUTH_FAILURE,
      payload: error,
    };

    expect(actions.userError(error)).toEqual(expectedAction);
  });

  it('should create an action to fetch user', () => {
    const auth: firebase.auth.Auth = {} as firebase.auth.Auth;
    const expectedAction: UserFetchAction = {
      type: types.FETCH_AUTH,
      payload: auth,
    };

    expect(actions.fetchUser(auth)).toEqual(expectedAction);
  });

  it('should create an action to load user data', () => {
    const user: User = {
      email: '',
      name: '',
      photoUrl: '',
    };
    const expectedAction: LoadUserAction = {
      type: types.LOAD_USER,
      payload: user,
    };

    expect(actions.loadUser(user)).toEqual(expectedAction);
  });

  it('should create an action to request users', () => {
    const expectedAction: UsersRequestAction = {
      type: types.FETCH_USERS_REQUEST,
    };

    expect(actions.usersRequested()).toEqual(expectedAction);
  });

  it('should create an action on users loaded', () => {
    const users: User[] = [];
    const expectedAction: UsersLoadedAction = {
      type: types.FETCH_USERS_SUCCESS,
      payload: users,
    };

    expect(actions.usersLoaded(users)).toEqual(expectedAction);
  });

  it('should create an action on error with users', () => {
    const error: any = 'error';
    const expectedAction: UsersErrorAction = {
      type: types.FETCH_USERS_FAILURE,
      payload: error,
    };

    expect(actions.usersError(error)).toEqual(expectedAction);
  });

  it('should create an action to fetch users', () => {
    const expectedAction: UsersFetchAction = {
      type: types.FETCH_USERS,
    };

    expect(actions.fetchUsers()).toEqual(expectedAction);
  });

  it('should create an action to requets messages', () => {
    const expectedAction: MessagesRequestedAction = {
      type: types.FETCH_MESSAGES_REQUEST,
    };

    expect(actions.messagesRequested()).toEqual(expectedAction);
  });

  it('should create an action on messages loaded', () => {
    const user: User = {
      email: '',
      name: '',
      photoUrl: '',
    };
    const dialog: Dialog = {
      id: '',
      messages: [],
      user1: user,
      user2: user,
    };
    const expectedAction: MessagesLoadedAction = {
      type: types.FETCH_MESSAGES_SUCCESS,
      payload: dialog,
    };

    expect(actions.messagesLoaded(dialog)).toEqual(expectedAction);
  });

  it('should create an action on error with messages', () => {
    const error: any = 'error';
    const expectedAction: MessagesErrorAction = {
      type: types.FETCH_MESSAGES_FAILURE,
      payload: error,
    };

    expect(actions.messagesError(error)).toEqual(expectedAction);
  });

  it('should create an action to fetch messages', () => {
    const from = '',
      to = '';
    const expectedAction: MessagesFetchAction = {
      type: types.FETCH_MESSAGES,
      payload: { from, to },
    };

    expect(actions.fetchMessages(from, to)).toEqual(expectedAction);
  });

  it('should create an action to send message request', () => {
    const expectedAction: SendMessageRequestAction = {
      type: types.FETCH_SEND_MESSAGE_REQUEST,
    };

    expect(actions.sendMessageRequested()).toEqual(expectedAction);
  });

  it('should create an action on send message loaded', () => {
    const expectedAction: SendMessageLoadedAction = {
      type: types.FETCH_SEND_MESSAGE_SUCCESS,
    };

    expect(actions.sendMessageLoaded()).toEqual(expectedAction);
  });

  it('should create an action on send message error', () => {
    const error: any = 'error';
    const expectedAction: SendMessageErrorAction = {
      type: types.FETCH_SEND_MESSAGE_FAILURE,
      payload: error,
    };

    expect(actions.sendMessageError(error)).toEqual(expectedAction);
  });

  it('should create an action to fetch send message', () => {
    const from = '',
      to = '',
      message = '';
    const expectedAction: SendMessageFetchAction = {
      type: types.FETCH_SEND_MESSAGE,
      payload: { from, to, message },
    };

    expect(actions.fetchSendMessage(from, to, message)).toEqual(expectedAction);
  });

  it('should create an action to request dialogs', () => {
    const expectedAction: DialogsRequestAction = {
      type: types.FETCH_DIALOGS_REQUEST,
    };

    expect(actions.dialogsRequested()).toEqual(expectedAction);
  });

  it('should create an action on dialogs loaded', () => {
    const dialogs: DialogInfo[] = [];
    const expectedAction: DialogsLoadedAction = {
      type: types.FETCH_DIALOGS_SUCCESS,
      payload: dialogs,
    };

    expect(actions.dialogsLoaded(dialogs)).toEqual(expectedAction);
  });

  it('should create an action on dialogs error', () => {
    const error: any = '';
    const expectedAction: DialogsErrorAction = {
      type: types.FETCH_DIALOGS_FAILURE,
      payload: error,
    };

    expect(actions.dialogsError(error)).toEqual(expectedAction);
  });

  it('should create an action to fetch dialogs', () => {
    const user: string = '';
    const expectedAction: DialogsFetchAction = {
      type: types.FETCH_DIALOGS,
      payload: user,
    };

    expect(actions.fetchDialogs(user)).toEqual(expectedAction);
  });
});
