import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs } from '../../actions';
import { Dialog } from '../Dialog/Dialog';
import './Dialogs.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../../utils/authContext';
import { State } from '../../reducers/types';

interface Props {}

export const Dialogs: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [user, loadingUser] = useAuthState(auth);
  const dialogs = useSelector((state) => (state as State).dialogs.dialogs);
  const loading = useSelector((state) => (state as State).dialogs.loading);

  useEffect(() => {
    if (user && !loadingUser) dispatch(fetchDialogs(user.email));
  }, [user]);

  return (
    <div className="chats__bottom dialogs">
      <div className="dialogs__wrapper">
        {dialogs.length ? (
          dialogs.map((dialog, i) => {
            return (
              <Dialog
                key={dialog.id}
                user={dialog.anotherUser}
                message={dialog.messageText}
                date={dialog.messageDate}
              />
              // <div key={i}>lol</div>
            );
          })
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <div>No dialogs yet</div>
        )}
        {/* <Dialog isActive />
        <Dialog />
        <Dialog />
        <Dialog />
        <Dialog /> */}
      </div>
    </div>
  );
};
