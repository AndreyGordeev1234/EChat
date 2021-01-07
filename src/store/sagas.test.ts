import {
  DialogsFetchAction,
  MessagesFetchAction,
  SendMessageFetchAction,
  UserFetchAction,
} from '../actions/types';
import {
  fetchDialogs,
  fetchMessages,
  fetchSendMessage,
  fetchUser,
  fetchUsers,
} from './sagas';
import * as types from '../constraints/ActionTypes';
import firebase from 'firebase/app';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import { Api } from '../service/firebaseApi';
import { Dialog, DialogInfo, User } from '../reducers/types';

describe('sagas', () => {
  it('should handle fetchUser when data is not null', () => {
    const action: UserFetchAction = {
      type: types.FETCH_AUTH,
      payload: {} as firebase.auth.Auth,
    };
    const gen = fetchUser(action);

    expect(gen.next().value).toEqual(put(actions.userRequested()));

    expect(gen.next().value).toEqual(
      call(Api.signInWithGoogle, action.payload),
    );

    const data: User = {
      email: '',
      name: '',
      photoUrl: '',
    };

    expect(gen.next(data).value).toEqual(put(actions.userLoaded(data)));

    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchUser when data is null', () => {
    const action: UserFetchAction = {
      type: types.FETCH_AUTH,
      payload: {} as firebase.auth.Auth,
    };
    const gen = fetchUser(action);

    expect(gen.next().value).toEqual(put(actions.userRequested()));

    expect(gen.next().value).toEqual(
      call(Api.signInWithGoogle, action.payload),
    );

    const data: User | null = null;
    expect(gen.next(data).value).toEqual(
      put(actions.userError('not authenticated')),
    );

    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchUsers', () => {
    const gen = fetchUsers();

    expect(gen.next().value).toEqual(put(actions.usersRequested()));

    expect(gen.next().value).toEqual(call(Api.getUsers));

    const users: User[] = [];
    expect(gen.next(users).value).toEqual(put(actions.usersLoaded(users)));
    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchMessages when there is a data', () => {
    const action: MessagesFetchAction = {
      type: types.FETCH_MESSAGES,
      payload: {
        from: 'user1',
        to: 'user2',
      },
    };
    const gen = fetchMessages(action);

    expect(gen.next().value).toEqual(put(actions.messagesRequested()));

    expect(gen.next().value).toEqual(call(Api.getMessages, action.payload));

    const user: User = {
      email: '',
      name: '',
      photoUrl: '',
    };
    const dialog: Dialog = {
      id: '1',
      messages: [],
      user1: user,
      user2: user,
    };
    expect(gen.next(dialog).value).toEqual(put(actions.messagesLoaded(dialog)));
    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchMessages when there is no data', () => {
    const action: MessagesFetchAction = {
      type: types.FETCH_MESSAGES,
      payload: {
        from: 'user1',
        to: 'user2',
      },
    };
    const gen = fetchMessages(action);

    expect(gen.next().value).toEqual(put(actions.messagesRequested()));

    expect(gen.next().value).toEqual(call(Api.getMessages, action.payload));

    const data = null;

    expect(gen.next(data).value).toEqual(
      put(actions.messagesError("couldn't find dialog")),
    );
    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchSendMessage when there is a data', () => {
    const action: SendMessageFetchAction = {
      type: types.FETCH_SEND_MESSAGE,
      payload: {
        from: 'user1',
        to: 'user2',
        message: 'hello',
      },
    };
    const gen = fetchSendMessage(action);

    expect(gen.next().value).toEqual(put(actions.sendMessageRequested()));

    expect(gen.next().value).toEqual(call(Api.addMessage, action.payload));

    const data: { status: boolean } = { status: true };
    expect(gen.next(data).value).toEqual(put(actions.sendMessageLoaded()));
    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchSendMessage when there is no data', () => {
    const action: SendMessageFetchAction = {
      type: types.FETCH_SEND_MESSAGE,
      payload: {
        from: 'user1',
        to: 'user2',
        message: 'hello',
      },
    };
    const gen = fetchSendMessage(action);

    expect(gen.next().value).toEqual(put(actions.sendMessageRequested()));

    expect(gen.next().value).toEqual(call(Api.addMessage, action.payload));

    const data = null;
    expect(gen.next(data).value).toEqual(
      put(actions.sendMessageError("couldn't create message")),
    );
    expect(gen.next().done).toEqual(true);
  });

  it('should handle fetchDialogs', () => {
    const action: DialogsFetchAction = {
      type: types.FETCH_DIALOGS,
      payload: 'user1',
    };
    const gen = fetchDialogs(action);

    expect(gen.next().value).toEqual(put(actions.dialogsRequested()));

    expect(gen.next().value).toEqual(call(Api.getDialogs, action.payload));

    const data: DialogInfo[] = [];
    expect(gen.next(data).value).toEqual(put(actions.dialogsLoaded(data)));
    expect(gen.next().done).toEqual(true);
  });
});
