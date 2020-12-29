import {
  FETCH_AUTH,
  FETCH_AUTH_FAILURE,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  LOAD_USER,
} from '../constraints/ActionTypes';
import { User } from '../reducers/types';
import firebase from 'firebase/app';

export interface UserRequestAction {
  type: typeof FETCH_AUTH_REQUEST;
}

export interface UserLoadedAction {
  type: typeof FETCH_AUTH_SUCCESS;
  payload: User;
}

export interface UserErrorAction {
  type: typeof FETCH_AUTH_FAILURE;
  payload: any;
}

export interface UserFetchAction {
  type: typeof FETCH_AUTH;
  payload: firebase.auth.Auth;
}

export interface LoadUserAction {
  type: typeof LOAD_USER;
  payload: User;
}

export type UserActionTypes =
  | UserRequestAction
  | UserLoadedAction
  | UserErrorAction
  | UserFetchAction
  | LoadUserAction;
