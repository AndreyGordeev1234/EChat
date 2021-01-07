import { DialogsActionTypes } from '../actions/types';
import {
  FETCH_DIALOGS_FAILURE,
  FETCH_DIALOGS_REQUEST,
  FETCH_DIALOGS_SUCCESS,
} from '../constraints/ActionTypes';
import { DialogsState } from './types';

const initialState: DialogsState = {
  dialogs: [],
  loading: false,
  error: null,
};

export const dialogsReducer = (
  state: DialogsState = initialState,
  action: DialogsActionTypes,
): DialogsState => {
  switch (action.type) {
    case FETCH_DIALOGS_REQUEST:
      return {
        dialogs: [],
        loading: true,
        error: null,
      };
    case FETCH_DIALOGS_SUCCESS:
      return {
        dialogs: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_DIALOGS_FAILURE:
      return {
        dialogs: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
