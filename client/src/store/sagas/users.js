import { takeEvery, call, put } from "redux-saga/effects";
import {
  ADD_USER,
  deleteUserFailedAction,
  deleteUserSuccessfulAction,
  DELETE_USER,
  LOGIN,
  loginFailedAction,
  loginSuccessfulAction,
  LOGOUT,
  logoutSuccessfulAction,
  userAddedSuccessfullyAction,
  userAddFailedAction,
} from "../actions/users";

const processLoginRequest = async (data) => {
  return fetch("http://localhost:5001/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res.data;
      }
    })
    .catch(console.log);
};

const processAddUserRequest = async (data) => {
  return fetch("http://localhost:5001/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res.message;
      }
    })
    .catch((er) => {
      console.log(er);
      return "Forbidden";
    });
};

const processDelUserRequest = async (data) => {
  return fetch("http://localhost:5001/api/users/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        return res;
      } else {
        return res.message;
      }
    })
    .catch((err) => {
      console.log(err);
      return "Error Occured";
    });
};

function* loginWorker({ payload }) {
  const res = yield call(processLoginRequest, payload);

  if (res.token) {
    localStorage.setItem("JWT_TOKEN", res.token);
    yield put(loginSuccessfulAction(res.token));
  } else {
    yield put(loginFailedAction({ ...res }));
  }
}

export function* loginWatcher() {
  yield takeEvery(LOGIN, loginWorker);
}

function* logoutWorker() {
  localStorage.setItem("JWT_TOKEN", "");
  yield put(logoutSuccessfulAction());
}

export function* logoutWatcher() {
  yield takeEvery(LOGOUT, logoutWorker);
}

export function* addUserWorker({ payload }) {
  const res = yield call(processAddUserRequest, payload);

  if (res === "Success") {
    yield put(userAddedSuccessfullyAction());
  } else {
    yield put(userAddFailedAction({ user: res }));
  }
}

export function* addUserWatcher() {
  yield takeEvery(ADD_USER, addUserWorker);
}

function* deleteUserWorker({ payload }) {
  const res = yield call(processDelUserRequest, payload);

  if (res.errors) {
    yield put(deleteUserFailedAction(res));
  } else {
    yield put(deleteUserSuccessfulAction());
  }
}

export function* deleteUserWatcher() {
  yield takeEvery(DELETE_USER, deleteUserWorker);
}
