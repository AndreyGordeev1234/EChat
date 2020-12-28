import React from 'react';
import './Chat.scss';

interface Props {}

export const Chat: React.FC<Props> = ({}) => {
  return (
    <div className="chat">
      <header className="chat__header">
        <h1 className="chat__title">Chat</h1>
      </header>
    </div>
  );
};
