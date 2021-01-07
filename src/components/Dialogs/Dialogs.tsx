import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs } from '../../actions';
import { Dialog } from '../Dialog/Dialog';
import './Dialogs.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../../utils/authContext';
import { State } from '../../reducers/types';
import { NoDialogs } from './NoDialogs';

interface Props {}

export const Dialogs: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [user, loadingUser] = useAuthState(auth);
  const dialogs = useSelector((state) => (state as State).dialogs.dialogs);
  const loading = useSelector((state) => (state as State).dialogs.loading);
  const dialogId = useSelector((state) => (state as State).messages.dialog?.id);

  useEffect(() => {
    if (user && !loadingUser) dispatch(fetchDialogs(user.email));
  }, [user, dispatch]);

  return (
    <div className="chats__bottom dialogs">
      <div className="dialogs__wrapper">
        {dialogs.length ? (
          dialogs.map((dialog) => {
            return (
              <Dialog
                key={dialog.id}
                user={dialog.anotherUser}
                message={dialog.messageText}
                date={dialog.messageDate}
                isActive={dialog.id === dialogId}
              />
            );
          })
        ) : loading ? (
          <div className="dialogs__loading">Loading...</div>
        ) : (
          <NoDialogs />
        )}
      </div>
    </div>
  );
};
