import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_AUTH } from '../constraints/ActionTypes';
import { Api } from '../service/firebaseApi';
import firebase from 'firebase/app';
import { UserFetchAction } from '../actions/types';
import { userError, userLoaded, userRequested } from '../actions';
import { User } from '../reducers/types';

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

export default function* rootSaga() {
  yield takeEvery(FETCH_AUTH, fetchUser);
}
