import { shallow } from 'enzyme';
import React from 'react';
import ChatsNav from '.';
import { haveOnPage } from '../../utils/testUtils';
import { ActivePage } from '../Chats/Chats';

describe('ChatsNav', () => {
  it('renders self and inner components', () => {
    const page: ActivePage = 'Dialogs';
    const wrapper = shallow(<ChatsNav active={page} onSetActive={() => {}} />);

    haveOnPage(wrapper, '.nav');
    haveOnPage(wrapper, '.nav__wrapper');
    haveOnPage(wrapper, '.nav__list');
    haveOnPage(wrapper, '.nav__item', 2);
    haveOnPage(wrapper, '.nav__item_active');
    haveOnPage(wrapper, '.nav__btn', 2);
    haveOnPage(wrapper, '.nav__icon', 2);
  });
});
