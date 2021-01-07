import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../utils/mockStore';
import { defaultSpy, haveOnPage } from '../../utils/testUtils';
import { Chat } from './Chat';
import Messages from '../Messages';
import MessageForm from '../MessageForm';
import { NoDialog } from './NoDialog';

describe('Chat', () => {
  const store = createMockStore();

  defaultSpy();

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  let wrapper: any;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Chat />
      </Provider>,
    );
  });

  it('renders inner components', () => {
    haveOnPage(wrapper, '.chat');
    haveOnPage(wrapper, '.chat__wrapper');
    haveOnPage(wrapper, '.chat__header');
    haveOnPage(wrapper, '.chat__title');
    haveOnPage(wrapper, '.chat__main');
    haveOnPage(wrapper, Messages);
  });

  it('renders message form when there is a dialog', () => {
    const store = createMockStore({
      messages: {
        dialog: {
          messages: [],
          user1: '',
          user2: '',
          id: '',
        },
        loading: false,
        error: null,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Chat />
      </Provider>,
    );

    haveOnPage(wrapper, MessageForm);
  });

  it('shows loading when dialog is loading', () => {
    const store = createMockStore({
      messages: {
        dialog: null,
        loading: true,
        error: null,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Chat />
      </Provider>,
    );

    haveOnPage(wrapper, '.chat__loading');
  });

  it('shows no dialog when no dialog loaded', () => {
    const store = createMockStore({
      messages: {
        dialog: null,
        loading: false,
        error: null,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Chat />
      </Provider>,
    );

    haveOnPage(wrapper, NoDialog);
  });
});
