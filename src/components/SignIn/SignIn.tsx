import React from 'react';
import { useAuth } from '../../utils/authContext';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../actions';

interface Props {}

export const SignIn: React.FC<Props> = ({}) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    dispatch(fetchUser(auth));
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
};
