import configureMockStore from 'redux-mock-store';

export const createMockStore = (state: any = {}, middlewares: any = []) => {
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    user: {
      user: null,
      loading: false,
      error: null,
    },
    users: {
      users: [],
      loading: false,
      error: null,
    },
    messages: {
      dialog: null,
      loading: false,
      error: null,
    },
    sendMessage: {
      status: false,
      loading: false,
      error: null,
    },
    dialogs: {
      dialogs: [],
      loading: false,
      error: null,
    },
    ...state,
  });

  return store;
};
