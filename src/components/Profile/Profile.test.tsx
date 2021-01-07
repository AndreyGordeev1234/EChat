import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import Profile from '.';
import { User } from '../../reducers/types';
import { createMockStore } from '../../utils/mockStore';
import { containText, defaultSpy, haveOnPage } from '../../utils/testUtils';

describe('Profile', () => {
  defaultSpy();
  const user: User = {
    email: 'testEmail',
    name: 'testName',
    photoUrl: 'testUrl',
  };
  const store = createMockStore({
    user: {
      user,
    },
  });
  let wrapper: any;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );
  });

  it('renders self and inner component with right text', () => {
    haveOnPage(wrapper, '.chats__top');
    haveOnPage(wrapper, '.profile');
    haveOnPage(wrapper, '.profile__image');
    haveOnPage(wrapper, '.profile__details');
    haveOnPage(wrapper, '.profile__name');
    haveOnPage(wrapper, '.profile__settings');
    haveOnPage(wrapper, '.profile__settings-ellipse', 3);

    containText(wrapper, '.profile__name', user.name);
  });

  it('renders settings-tab on click', () => {
    wrapper.find('.profile__settings').simulate('click');

    haveOnPage(wrapper, '.profile__settings-tab');
    haveOnPage(wrapper, '.sign-out');
  });
});
