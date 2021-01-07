import React from 'react';
import './ChatsNav.scss';
import dialogIcon from '../../assets/images/svg/nav-dialogs.svg';
import dialogActiveIcon from '../../assets/images/svg/nav-dialogs-active.svg';
import findIcon from '../../assets/images/svg/nav-find.svg';
import findActiveIcon from '../../assets/images/svg/nav-find-active.svg';
import { ActivePage } from '../Chats/Chats';

interface Props {
  active: ActivePage;
  onSetActive: (page: ActivePage) => void;
}

export const ChatsNav: React.FC<Props> = ({ active, onSetActive }) => {
  const setActiveClass = (item: ActivePage) => {
    if (item === active) return 'nav__item nav__item_active';
    return 'nav__item';
  };

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <ul className="nav__list">
          <li className={setActiveClass('Dialogs')}>
            <button className="nav__btn" onClick={() => onSetActive('Dialogs')}>
              {active === 'Dialogs' ? (
                <img
                  src={dialogActiveIcon}
                  alt="Dialogs"
                  className="nav__icon"
                />
              ) : (
                <img src={dialogIcon} alt="Dialogs" className="nav__icon" />
              )}
            </button>
          </li>
          <li className={setActiveClass('Find')}>
            <button className="nav__btn" onClick={() => onSetActive('Find')}>
              {active === 'Find' ? (
                <img src={findActiveIcon} alt="Find" className="nav__icon" />
              ) : (
                <img src={findIcon} alt="Find" className="nav__icon" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
