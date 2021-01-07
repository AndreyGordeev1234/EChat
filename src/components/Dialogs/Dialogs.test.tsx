import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { DialogsState } from '../../reducers/types';
import { createMockStore } from '../../utils/mockStore';
import { defaultSpy, haveOnPage } from '../../utils/testUtils';
import Dialog from '../Dialog';
import { Dialogs } from './Dialogs';
import { NoDialogs } from './NoDialogs';

describe('Dialogs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders self and inner component', () => {
    defaultSpy();
    const dialogs: DialogsState = {
      dialogs: [
        {
          id: '1',
          anotherUser: {
            email: 'testEmail',
            name: 'testName',
            photoUrl: 'testUrl',
          },
          messageDate: new Date().getTime() / 1000,
          messageText: 'hello',
        },
      ],
      loading: false,
      error: null,
    };
    const store = createMockStore({
      dialogs,
    });
    const wrapper = mount(
      <Provider store={store}>
        <Dialogs />
      </Provider>,
    );

    haveOnPage(wrapper, '.chats__bottom');
    haveOnPage(wrapper, '.dialogs');
    haveOnPage(wrapper, '.dialogs__wrapper');
    haveOnPage(wrapper, Dialog);
  });

  it('renders loading when dialogs are loading', () => {
    defaultSpy();
    const store = createMockStore({
      dialogs: {
        dialogs: [],
        loading: true,
        error: null,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Dialogs />
      </Provider>,
    );

    haveOnPage(wrapper, '.dialogs__loading');
  });

  it('renders no dialog when no dialog in state', () => {
    defaultSpy();
    const store = createMockStore({
      dialogs: {
        dialogs: [],
        loading: false,
        error: null,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Dialogs />
      </Provider>,
    );

    haveOnPage(wrapper, NoDialogs);
  });
});
