import { MessagesActionTypes } from '../actions/types';
import {
  ADD_MESSAGE,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
} from '../constraints/ActionTypes';
import { MessagesState, Dialog } from './types';

const initialState: MessagesState = {
  dialog: null,
  loading: false,
  error: null,
};

export const messagesReducer = (
  state: MessagesState = initialState,
  action: MessagesActionTypes,
): MessagesState => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        dialog: null,
        loading: true,
        error: null,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        dialog: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        dialog: null,
        loading: false,
        error: action.payload,
      };
    case ADD_MESSAGE:
      let dialog: Dialog | null = null;
      if (state.dialog)
        dialog = {
          ...state.dialog,
          messages: [action.payload, ...state.dialog.messages],
        };
      return {
        ...state,
        dialog,
      };
    default:
      return state;
  }
};
