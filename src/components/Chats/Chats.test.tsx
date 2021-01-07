import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../utils/mockStore';
import { defaultSpy, haveOnPage } from '../../utils/testUtils';
import ChatsNav from '../ChatsNav';
import Dialogs from '../Dialogs';
import Profile from '../Profile';
import { Chats } from './Chats';

describe('Chats', () => {
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
        <Chats />
      </Provider>,
    );
  });

  it('renders inner components', () => {
    haveOnPage(wrapper, '.chats');
    haveOnPage(wrapper, Profile);
    haveOnPage(wrapper, ChatsNav);
    haveOnPage(wrapper, Dialogs);
  });
});
