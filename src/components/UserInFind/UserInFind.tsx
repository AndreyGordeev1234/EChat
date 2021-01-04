import React from 'react';
import './UserInFind.scss';
import { State, User } from '../../reducers/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../actions';

interface Props {
  user: User;
}

export const UserInFind: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => (state as State).user.user!.email);

  const loadDialog = (from: string, to: string) => {
    dispatch(fetchMessages(from, to));
  };

  return (
    <button
      className="user-find"
      onClick={() => {
        loadDialog(email, user.email);
      }}
    >
      <div
        className="user-find__image"
        style={{
          backgroundImage: `url(${user?.photoUrl})`,
        }}
      ></div>
      <div className="user-find__info">
        <div className="user-find__name">{user.name}</div>
      </div>
    </button>
  );
};
