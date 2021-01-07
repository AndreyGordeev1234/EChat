import React, { useState } from 'react';
import ChatsNav from '../ChatsNav';
import Dialogs from '../Dialogs';
import Find from '../Find';
import Profile from '../Profile';
import './Chats.scss';

export type ActivePage = 'Dialogs' | 'Find';

export const Chats: React.FC<{}> = () => {
  const [page, setPage] = useState<ActivePage>('Dialogs');
  const setActivePage = (page: ActivePage) => {
    setPage(page);
  };

  return (
    <div className="chats">
      <Profile />
      <div></div>
      {page === 'Dialogs' ? <Dialogs /> : <Find />}
      <ChatsNav active={page} onSetActive={setActivePage} />
    </div>
  );
};
