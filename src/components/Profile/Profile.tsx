import React, { useState } from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { State } from '../../reducers/types';
import { useAuth } from '../../utils/authContext';

interface Props {}

export const Profile: React.FC<Props> = ({}) => {
  const user = useSelector((state) => (state as State).user.user);
  const [show, setShow] = useState(false);
  const auth = useAuth();

  return (
    <div className="chats__top profile">
      <div
        className="profile__image"
        style={{
          backgroundImage: `url(${user?.photoUrl})`,
        }}
      ></div>
      <div className="profile__details">
        <p className="profile__name">{user?.name}</p>
        {/* <button className="profile__status">
          <div
            className="profile__status-indicator"
            style={{ backgroundColor: '#F3BA4A' }}
          ></div>
          <p className="profile__status-text">Working</p>
        </button> */}
      </div>
      <button
        className="profile__settings"
        onClick={() => setShow((prev) => !prev)}
      >
        <div className="profile__settings-ellipse"></div>
        <div className="profile__settings-ellipse"></div>
        <div className="profile__settings-ellipse"></div>
      </button>
      {show && (
        <div className="profile__settings-tab">
          <button
            className="profile__sign-out sign-out"
            onClick={() => auth.signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
