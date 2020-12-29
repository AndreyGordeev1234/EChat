import {
  FETCH_AUTH,
  FETCH_AUTH_FAILURE,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  LOAD_USER,
} from '../constraints/ActionTypes';
import { User } from '../reducers/types';
import {
  LoadUserAction,
  UserErrorAction,
  UserFetchAction,
  UserLoadedAction,
  UserRequestAction,
} from './types';
import firebase from 'firebase/app';

export const userRequested = (): UserRequestAction => ({
  type: FETCH_AUTH_REQUEST,
});

export const userLoaded = (user: User): UserLoadedAction => ({
  type: FETCH_AUTH_SUCCESS,
  payload: user,
});

export const userError = (error: any): UserErrorAction => ({
  type: FETCH_AUTH_FAILURE,
  payload: error,
});

export const fetchUser = (auth: firebase.auth.Auth): UserFetchAction => ({
  type: FETCH_AUTH,
  payload: auth,
});

export const loadUser = (user: User): LoadUserAction => ({
  type: LOAD_USER,
  payload: user,
});
