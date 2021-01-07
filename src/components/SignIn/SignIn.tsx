import React from 'react';
import { useAuth } from '../../utils/authContext';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../actions';
import './SignIn.scss';

export const SignIn: React.FC<{}> = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    dispatch(fetchUser(auth));
  };

  return (
    <div className="sign-in">
      <button className="sign-in__btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};
