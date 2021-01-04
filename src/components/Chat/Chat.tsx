import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers/types';
import MessageForm from '../MessageForm';
import Messages from '../Messages';
import './Chat.scss';

interface Props {}

export const Chat: React.FC<Props> = ({}) => {
  const dialog = useSelector((state) => (state as State).messages.dialog);
  const loading = useSelector((state) => (state as State).messages.loading);

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <header className="chat__header">
          <h1 className="chat__title">Chat</h1>
        </header>
        <main className="chat__main">
          <Messages />
          {dialog ? (
            <MessageForm />
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            <div>No dialog loaded...</div>
          )}
        </main>
      </div>
    </div>
  );
};
