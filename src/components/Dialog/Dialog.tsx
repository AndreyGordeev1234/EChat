import React from 'react';
import './Dialog.scss';
import { fromUnixToShortDate } from '../../utils/fromUnixToDate';
import { State, User } from '../../reducers/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../actions';

interface Props {
  user: User;
  message: string;
  date: any;
  isActive?: boolean;
}

export const Dialog: React.FC<Props> = ({
  user,
  message,
  date,
  isActive = false,
}) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => (state as State).user.user);

  const loadDialog = (from: string | undefined, to: string) => {
    if (from) dispatch(fetchMessages(from, to));
  };

  return (
    <button
      className={isActive ? 'dialog dialog_active' : 'dialog'}
      onClick={() => loadDialog(authUser?.email, user.email)}
    >
      <div
        className="dialog__image"
        style={{
          backgroundImage: `url(${user?.photoUrl})`,
        }}
      ></div>
      <div className="dialog__info">
        <div className="dialog__name">{user.name}</div>
        <div className="dialog__text">{message}</div>
      </div>
      <time
        className={
          isActive ? 'dialog__time dialog__time_active' : 'dialog__time'
        }
      >
        {fromUnixToShortDate(date.seconds)}
      </time>
    </button>
  );
};
