import React from 'react';
import Dialogs from '../Dialogs';
import Profile from '../Profile';
import './Chats.scss';

interface Props {}

export const Chats: React.FC<Props> = ({}) => {
  return (
    <div className="chats">
      <Profile />
      <Dialogs />
    </div>
  );
};
