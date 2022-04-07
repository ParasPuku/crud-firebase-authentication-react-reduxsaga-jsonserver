import {
  take,
  takeEvery,
  takeLatest,
  put,
  delay,
  all,
  call,
  fork,
} from "redux-saga/effects";

import * as actionTypes from "../actiontypes/ActionTypes";

import {
  loadUserSuccess,
  loadUserError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserError,
  updateUserSuccess,
} from "../actions/UserActions";
import {
  createUserApi,
  deleteUserApi,
  fetchDataApi,
  updateUserApi,
} from "../api/FetchData";

function* onLoadUserStartAsync() {
  try {
    const response = yield call(fetchDataApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUserSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUserError(error.response.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess());
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onUpdateUserStartAsync({ payload: {id, formValue} }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if(response.status === 200) {
        yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(actionTypes.LOAD_USER_START, onLoadUserStartAsync);
}

function* onCreateUser() {
  yield takeLatest(actionTypes.CREATE_USER_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(actionTypes.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

function* onUpdateUser() {
  yield takeLatest(actionTypes.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSaga = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSaga]);
}
