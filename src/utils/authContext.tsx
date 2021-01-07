import React, { useContext } from 'react';
import firebase from 'firebase/app';

const AuthContext = React.createContext({} as firebase.auth.Auth);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  auth: firebase.auth.Auth;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ auth, children }) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
