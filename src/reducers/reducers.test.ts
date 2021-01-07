import {
  DialogsActionTypes,
  MessagesActionTypes,
  SendMessageActionTypes,
  UserActionTypes,
  UsersActionTypes,
} from '../actions/types';
import { dialogsReducer } from './dialogs';
import * as types from '../constraints/ActionTypes';
import {
  Dialog,
  DialogInfo,
  DialogsState,
  Message,
  MessagesState,
  SendMessageState,
  User,
  UsersState,
  UserState,
} from './types';
import { messagesReducer } from './messages';
import { sendMessageReducer } from './sendMessage';
import { userReducer } from './user';
import { usersReducer } from './users';

describe('dialogs reducer', () => {
  const initialState: DialogsState = {
    dialogs: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(dialogsReducer(undefined, {} as DialogsActionTypes)).toEqual(
      initialState,
    );
  });

  it('should handle FETCH_DIALOGS_REQUEST', () => {
    expect(
      dialogsReducer(initialState, { type: types.FETCH_DIALOGS_REQUEST }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_DIALOGS_SUCCESS', () => {
    const dialogs: DialogInfo[] = [
      {
        id: '',
        anotherUser: {
          email: '',
          name: '',
          photoUrl: '',
        },
        messageDate: '',
        messageText: '',
      },
    ];

    expect(
      dialogsReducer(initialState, {
        type: types.FETCH_DIALOGS_SUCCESS,
        payload: dialogs,
      }),
    ).toEqual({
      ...initialState,
      dialogs,
    });
  });

  it('should handle FETCH_DIALOGS_FAILURE', () => {
    const error: any = '';
    expect(
      dialogsReducer(initialState, {
        type: types.FETCH_DIALOGS_FAILURE,
        payload: error,
      }),
    ).toEqual({
      ...initialState,
      error,
    });
  });
});

describe('messages reducer', () => {
  const initialState: MessagesState = {
    dialog: null,
    loading: false,
    error: null,
  };

  const user: User = {
    email: '',
    name: '',
    photoUrl: '',
  };

  it('should return the initial state', () => {
    expect(messagesReducer(undefined, {} as MessagesActionTypes)).toEqual(
      initialState,
    );
  });

  it('should handle FETCH_MESSAGES_REQUEST', () => {
    expect(
      messagesReducer(initialState, { type: types.FETCH_MESSAGES_REQUEST }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_MESSAGES_SUCCESS', () => {
    const dialog: Dialog = {
      id: '',
      messages: [],
      user1: user,
      user2: user,
    };
    expect(
      messagesReducer(initialState, {
        type: types.FETCH_MESSAGES_SUCCESS,
        payload: dialog,
      }),
    ).toEqual({
      ...initialState,
      dialog,
    });
  });

  it('should handle FETCH_MESSAGES_FAILURE', () => {
    const error: any = '';
    expect(
      messagesReducer(initialState, {
        type: types.FETCH_MESSAGES_FAILURE,
        payload: error,
      }),
    ).toEqual({
      ...initialState,
      error,
    });
  });

  it('should handle ADD_MESSAGE', () => {
    const message: Message = {
      id: '',
      from: '',
      text: '',
      createdAt: '',
    };
    const state: MessagesState = {
      ...initialState,
      dialog: {
        id: '',
        messages: [
          {
            id: '1',
            createdAt: '',
            from: '',
            text: '',
          },
        ],
        user1: user,
        user2: user,
      },
    };
    expect(
      messagesReducer(state, { type: types.ADD_MESSAGE, payload: message }),
    ).toEqual({
      ...state,
      dialog: {
        ...state.dialog,
        messages: [message, ...state.dialog!.messages],
      },
    });
  });
});

describe('sendMessage reducer', () => {
  const initialState: SendMessageState = {
    status: false,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(sendMessageReducer(undefined, {} as SendMessageActionTypes)).toEqual(
      initialState,
    );
  });

  it('should handle FETCH_SEND_MESSAGE_REQUEST', () => {
    expect(
      sendMessageReducer(initialState, {
        type: types.FETCH_SEND_MESSAGE_REQUEST,
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_SEND_MESSAGE_SUCCESS', () => {
    expect(
      sendMessageReducer(initialState, {
        type: types.FETCH_SEND_MESSAGE_SUCCESS,
      }),
    ).toEqual({
      ...initialState,
      status: true,
    });
  });

  it('should handle FETCH_SEND_MESSAGE_FAILURE', () => {
    const error: any = '';
    expect(
      sendMessageReducer(initialState, {
        type: types.FETCH_SEND_MESSAGE_FAILURE,
        payload: error,
      }),
    ).toEqual({
      ...initialState,
      error,
    });
  });
});

describe('user reducer', () => {
  const initalState: UserState = {
    user: null,
    loading: false,
    error: null,
  };
  const user: User = {
    email: '',
    name: '',
    photoUrl: '',
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, {} as UserActionTypes)).toEqual(initalState);
  });

  it('should handle FETCH_AUTH_REQUEST', () => {
    expect(
      userReducer(initalState, { type: types.FETCH_AUTH_REQUEST }),
    ).toEqual({
      ...initalState,
      loading: true,
    });
  });

  it('should handle FETCH_AUTH_SUCCESS', () => {
    expect(
      userReducer(initalState, {
        type: types.FETCH_AUTH_SUCCESS,
        payload: user,
      }),
    ).toEqual({
      ...initalState,
      user,
    });
  });

  it('should handle FETCH_AUTH_FAILURE', () => {
    const error: any = '';
    expect(
      userReducer(initalState, {
        type: types.FETCH_AUTH_FAILURE,
        payload: error,
      }),
    ).toEqual({
      ...initalState,
      error,
    });
  });

  it('should handle LOAD_USER', () => {
    expect(
      userReducer(initalState, { type: types.LOAD_USER, payload: user }),
    ).toEqual({
      ...initalState,
      user,
    });
  });
});

describe('users reducer', () => {
  const initalState: UsersState = {
    users: [],
    loading: false,
    error: null,
  };

  it('should return the inital state', () => {
    expect(usersReducer(undefined, {} as UsersActionTypes)).toEqual(
      initalState,
    );
  });

  it('should handle FETCH_USERS_REQUEST', () => {
    expect(
      usersReducer(initalState, { type: types.FETCH_USERS_REQUEST }),
    ).toEqual({
      ...initalState,
      loading: true,
    });
  });

  it('should handle FETCH_USERS_SUCCESS', () => {
    const users: User[] = [
      {
        email: '',
        name: '',
        photoUrl: '',
      },
    ];
    expect(
      usersReducer(initalState, {
        type: types.FETCH_USERS_SUCCESS,
        payload: users,
      }),
    ).toEqual({
      ...initalState,
      users,
    });
  });

  it('should handle FETCH_USERS_FAILURE', () => {
    const error: any = '';
    expect(
      usersReducer(initalState, {
        type: types.FETCH_USERS_FAILURE,
        payload: error,
      }),
    ).toEqual({
      ...initalState,
      error,
    });
  });
});
