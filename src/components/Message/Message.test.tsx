import { shallow } from 'enzyme';
import React from 'react';
import { Message as MessageInterface, User } from '../../reducers/types';
import { fromUnixToDate } from '../../utils/fromUnixToDate';
import { containText, haveOnPage } from '../../utils/testUtils';
import { Message } from './Message';

describe('Message', () => {
  it('renders self and inner components', () => {
    const date = {
      seconds: new Date().getTime() / 1000,
    };
    const message: MessageInterface = {
      id: '1',
      from: 'test',
      text: 'hello',
      createdAt: date,
    };
    const user: User = {
      name: 'testName',
      email: 'testEmail',
      photoUrl: 'testUrl',
    };
    const wrapper = shallow(
      <Message isMy={false} isFirst={true} message={message} user={user} />,
    );

    haveOnPage(wrapper, '.message');
    haveOnPage(wrapper, '.message_others');
    haveOnPage(wrapper, '.message_first');
    haveOnPage(wrapper, '.message__user');
    haveOnPage(wrapper, '.message__user_others');
    haveOnPage(wrapper, '.message__main');
    haveOnPage(wrapper, '.message__info');
    haveOnPage(wrapper, '.message__info_others');
    haveOnPage(wrapper, '.message__text');
    haveOnPage(wrapper, '.message__text_others');
    haveOnPage(wrapper, '.message__time');
    haveOnPage(wrapper, '.message__time_others');
    haveOnPage(wrapper, '.message__image');
    haveOnPage(wrapper, '.message__image_others');

    containText(wrapper, '.message__user', user.name);
    containText(wrapper, '.message__text', message.text);
    containText(
      wrapper,
      '.message__time',
      fromUnixToDate(message.createdAt.seconds),
    );
  });
});
