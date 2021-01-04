import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/styles.scss';
import firebase from 'firebase/app';
import { AuthProvider } from './utils/authContext';
import { Provider } from 'react-redux';
import { store } from './store';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'echat-56be5.firebaseapp.com',
  projectId: 'echat-56be5',
  storageBucket: 'echat-56be5.appspot.com',
  messagingSenderId: '875853984653',
  appId: '1:875853984653:web:fcdffab894b219f982c3c4',
});

firebase.firestore().enablePersistence();

const auth = firebase.auth();

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider auth={auth}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </Provider>,
  document.getElementById('root'),
);
