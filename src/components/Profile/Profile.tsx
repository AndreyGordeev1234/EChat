import React from 'react';
import './Profile.scss';
import profilePic from '../../assets/images/profile-picture.png';

interface Props {}

export const Profile: React.FC<Props> = ({}) => {
  return (
    <div className="chats__top profile">
      <div className="profile__image">
        <img src={profilePic} alt="Profile image" className="profile__img" />
      </div>
      <div className="profile__details">
        <p className="profile__name">Mehmet Revnaki</p>
        <button className="profile__status">
          <div
            className="profile__status-indicator"
            style={{ backgroundColor: '#F3BA4A' }}
          ></div>
          <p className="profile__status-text">Working</p>
        </button>
      </div>
      <button className="profile__settings">
        <div className="profile__settings-ellipse"></div>
        <div className="profile__settings-ellipse"></div>
        <div className="profile__settings-ellipse"></div>
      </button>
    </div>
  );
};
