import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { UsersState } from '../../reducers/types';
import { createMockStore } from '../../utils/mockStore';
import { haveOnPage } from '../../utils/testUtils';
import { FindInput } from '../FindInput/FindInput';
import UserInFind from '../UserInFind';
import { Find } from './Find';

describe('Find', () => {
  it('renders self and inner components', () => {
    const users: UsersState = {
      users: [
        {
          email: 'testEmail',
          name: 'testName',
          photoUrl: 'testUrl',
        },
      ],
      loading: false,
      error: null,
    };
    const store = createMockStore({
      users,
      user: {
        user: {
          email: 'test',
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Find />
      </Provider>,
    );

    haveOnPage(wrapper, '.find');
    haveOnPage(wrapper, FindInput);
    haveOnPage(wrapper, '.find__wrapper');
    haveOnPage(wrapper, UserInFind);
  });

  it('renders loading when users are loading', () => {
    const store = createMockStore({
      users: {
        users: [],
        loading: true,
        error: null,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Find />
      </Provider>,
    );

    haveOnPage(wrapper, '.find__loading');
  });
});
