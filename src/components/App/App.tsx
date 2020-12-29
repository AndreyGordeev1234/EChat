import React, { useEffect } from 'react';
import Chat from '../Chat';
import Chats from '../Chats';
import './App.scss';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../../utils/authContext';
import SignIn from '../SignIn';
import SignOut from '../SignOut';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../actions';

export const App: React.FC<{}> = () => {
  const auth = useAuth();
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user)
      dispatch(
        loadUser({
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }),
      );
  }, [user]);

  return (
    <>
      {/* <SignOut /> */}
      {user ? (
        <div className="app">
          <Chats />
          <Chat />
        </div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <SignIn />
      )}
    </>
  );
};
