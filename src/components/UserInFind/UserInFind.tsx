import React from 'react';
import './UserInFind.scss';
import profilePic from '../../assets/images/profile-picture.png';

interface Props {}

export const UserInFind: React.FC<Props> = ({}) => {
  return (
    <button className="user-find">
      <div className="user-find__image">
        <img src={profilePic} alt="User" className="user-find__img" />
      </div>
      <div className="user-find__info">
        <div className="user-find__name">Alfredo Vetrovs</div>
      </div>
    </button>
  );
};
