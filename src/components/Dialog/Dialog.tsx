import React from 'react';
import './Dialog.scss';
import profilePic from '../../assets/images/profile-picture.png';

interface Props {
  isActive?: boolean;
}

export const Dialog: React.FC<Props> = ({ isActive = false }) => {
  return (
    <button className={isActive ? 'dialog dialog_active' : 'dialog'}>
      <div className="dialog__image">
        <img src={profilePic} alt="User" className="dialog__img" />
      </div>
      <div className="dialog__info">
        <div className="dialog__name">Alfredo Vetrovs</div>
        <div className="dialog__text">OMW bro...</div>
      </div>
      <time
        className={
          isActive ? 'dialog__time dialog__time_active' : 'dialog__time'
        }
      >
        17/06/2020
      </time>
    </button>
  );
};
