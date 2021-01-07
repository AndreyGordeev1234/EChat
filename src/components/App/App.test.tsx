import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { App } from './App';
import * as authHooks from 'react-firebase-hooks/auth';
import SignIn from '../SignIn';
import { createMockStore } from '../../utils/mockStore';
import Chat from '../Chat';
import Chats from '../Chats';
import { defaultSpy, haveOnPage } from '../../utils/testUtils';

describe('App', () => {
  const store = createMockStore();

  defaultSpy();

  let wrapper: any;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders Sign In when no user and no loading', () => {
    haveOnPage(wrapper, SignIn);
  });

  it('renders app when there is a user and no loading', () => {
    jest
      .spyOn(authHooks, 'useAuthState')
      .mockReturnValue([{}, false, undefined]);
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    haveOnPage(wrapper, '.app');
    haveOnPage(wrapper, Chat);
    haveOnPage(wrapper, Chats);
  });

  it('renders loading indicator', () => {
    jest
      .spyOn(authHooks, 'useAuthState')
      .mockReturnValue([undefined, true, undefined]);
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    haveOnPage(wrapper, '.app-loading');
  });
});
