import React from 'react';
import Chat from '../Chat';
import Chats from '../Chats';
import './App.scss';

export const App: React.FC<{}> = () => {
  return (
    <div className="app">
      <Chats />
      <Chat />
    </div>
  );
};
