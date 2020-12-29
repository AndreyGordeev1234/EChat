import { UserActionTypes } from '../actions/types';
import {
  FETCH_AUTH_FAILURE,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  LOAD_USER,
} from '../constraints/ActionTypes';
import { UserState } from './types';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes,
) => {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case FETCH_AUTH_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_AUTH_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
