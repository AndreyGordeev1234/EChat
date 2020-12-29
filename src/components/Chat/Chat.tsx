import React from 'react';
import Messages from '../Messages';
import './Chat.scss';

interface Props {}

export const Chat: React.FC<Props> = ({}) => {
  return (
    <div className="chat">
      <div className="chat__wrapper">
        <header className="chat__header">
          <h1 className="chat__title">Chat</h1>
        </header>
        <main className="chat__main">
          <Messages />
          <form className="chat__form">
            <p className="chat__fields">
              <input
                type="text"
                name="message"
                className="chat__field"
                placeholder="Type a new message..."
              />
              <button type="submit" className="chat__submit">
                Send
              </button>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};
