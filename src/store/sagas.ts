import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  dialogsError,
  dialogsLoaded,
  dialogsRequested,
  messagesError,
  messagesLoaded,
  messagesRequested,
  sendMessageError,
  sendMessageLoaded,
  sendMessageRequested,
  userError,
  userLoaded,
  userRequested,
  usersError,
  usersLoaded,
  usersRequested,
} from '../actions';
import {
  DialogsFetchAction,
  MessagesFetchAction,
  SendMessageFetchAction,
  UserFetchAction,
} from '../actions/types';
import {
  FETCH_AUTH,
  FETCH_DIALOGS,
  FETCH_MESSAGES,
  FETCH_SEND_MESSAGE,
  FETCH_USERS,
} from '../constraints/ActionTypes';
import { Dialog, DialogInfo, User } from '../reducers/types';
import { Api } from '../service/firebaseApi';

function* fetchUser(action: UserFetchAction) {
  try {
    yield put(userRequested());
    const data: User = yield call(Api.signInWithGoogle, action.payload);
    if (data) yield put(userLoaded(data));
    else yield put(userError('not authenticated'));
  } catch (error) {
    yield put(userError(error));
  }
}

function* fetchUsers() {
  try {
    yield put(usersRequested());
    const data: User[] = yield call(Api.getUsers);
    yield put(usersLoaded(data));
  } catch (error) {
    yield put(usersError(error));
  }
}

function* fetchMessages(action: MessagesFetchAction) {
  try {
    yield put(messagesRequested());
    const data: Dialog = yield call(Api.getMessages, action.payload);
    if (data) yield put(messagesLoaded(data));
    else yield put(messagesError("couldn't find dialog"));
  } catch (error) {
    yield put(usersError(error));
  }
}

function* fetchSendMessage(action: SendMessageFetchAction) {
  try {
    yield put(sendMessageRequested());
    const data: { status: boolean } | null = yield call(
      Api.addMessage,
      action.payload,
    );
    if (data) yield put(sendMessageLoaded());
    else yield put(sendMessageError("couldn't create message"));
  } catch (error) {
    yield put(sendMessageError(error));
  }
}

function* fetchDialogs(action: DialogsFetchAction) {
  try {
    yield put(dialogsRequested());
    const data: DialogInfo[] = yield call(Api.getDialogs, action.payload);
    yield put(dialogsLoaded(data));
  } catch (error) {
    yield put(dialogsError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_AUTH, fetchUser),
    takeEvery(FETCH_USERS, fetchUsers),
    takeEvery(FETCH_MESSAGES, fetchMessages),
    takeEvery(FETCH_SEND_MESSAGE, fetchSendMessage),
    takeEvery(FETCH_DIALOGS, fetchDialogs),
  ]);
}
