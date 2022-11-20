import { takeEvery, call, put } from "redux-saga/effects";
import {
  BOOKING, bookingFailedAction, bookingSuccessfulAction,
} from "../actions/booking";

const processBookingRequest = async (data) => {
  return fetch("http://localhost:5001/api/bookings/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("JWT_TOKEN")}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    })
    .catch(console.log);
};

function* bookingWorker({ payload }) {
  const res = yield call(processBookingRequest, payload);

  if(res.message === 'success') {
    yield put(bookingSuccessfulAction());
  } else {
    yield put(bookingFailedAction(res));
  }
}

export function* bookingWatcher() {
  yield takeEvery(BOOKING, bookingWorker);
}
