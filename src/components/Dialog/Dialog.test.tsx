import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { User } from '../../reducers/types';
import { fromUnixToShortDate } from '../../utils/fromUnixToDate';
import { createMockStore } from '../../utils/mockStore';
import { containText, haveOnPage } from '../../utils/testUtils';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('renders self and inner components with text based on props and state', () => {
    const store = createMockStore();
    const user: User = {
      email: 'testEmail',
      name: 'testName',
      photoUrl: 'testURL',
    };
    const message = 'hello';
    const date = {
      seconds: (new Date().getTime() / 1000).toString(),
    };

    const wrapper = mount(
      <Provider store={store}>
        <Dialog user={user} message={message} date={date} isActive={true} />
      </Provider>,
    );

    haveOnPage(wrapper, '.dialog');
    haveOnPage(wrapper, '.dialog_active');
    haveOnPage(wrapper, '.dialog__image');
    haveOnPage(wrapper, '.dialog__info');
    haveOnPage(wrapper, '.dialog__name');
    haveOnPage(wrapper, '.dialog__text');
    haveOnPage(wrapper, '.dialog__time');
    haveOnPage(wrapper, '.dialog__time_active');

    containText(wrapper, '.dialog__name', user.name);
    containText(wrapper, '.dialog__text', message);
    containText(wrapper, '.dialog__time', fromUnixToShortDate(date.seconds));
  });
});
