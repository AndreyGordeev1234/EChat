import React from 'react';
import { Dialog } from '../Dialog/Dialog';
import './Dialogs.scss';

interface Props {}

export const Dialogs: React.FC<Props> = ({}) => {
  return (
    <div className="chats__bottom dialogs">
      <div className="dialogs__wrapper">
        <Dialog isActive />
        <Dialog />
        <Dialog />
        <Dialog />
        <Dialog />
      </div>
    </div>
  );
};
