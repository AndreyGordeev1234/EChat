import { UsersActionTypes } from '../actions/types';
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from '../constraints/ActionTypes';
import { UsersState } from './types';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = (
  state: UsersState = initialState,
  action: UsersActionTypes,
): UsersState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        users: [],
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
