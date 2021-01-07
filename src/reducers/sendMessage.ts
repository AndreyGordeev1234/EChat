import { SendMessageActionTypes } from '../actions/types';
import {
  FETCH_SEND_MESSAGE_FAILURE,
  FETCH_SEND_MESSAGE_REQUEST,
  FETCH_SEND_MESSAGE_SUCCESS,
} from '../constraints/ActionTypes';
import { SendMessageState } from './types';

const initalState: SendMessageState = {
  status: false,
  loading: false,
  error: null,
};

export const sendMessageReducer = (
  state: SendMessageState = initalState,
  action: SendMessageActionTypes,
): SendMessageState => {
  switch (action.type) {
    case FETCH_SEND_MESSAGE_REQUEST:
      return {
        status: false,
        loading: true,
        error: null,
      };
    case FETCH_SEND_MESSAGE_SUCCESS:
      return {
        status: true,
        loading: false,
        error: null,
      };
    case FETCH_SEND_MESSAGE_FAILURE:
      return {
        status: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
