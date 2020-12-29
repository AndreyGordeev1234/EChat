import React from 'react';
import { useAuth } from '../../utils/authContext';

interface Props {}

export const SignOut: React.FC<Props> = ({}) => {
  const auth = useAuth();

  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};
