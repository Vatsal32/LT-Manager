import { takeEvery, call, put } from "redux-saga/effects";
import {
  approveBookingFailed,
  approveBookingSuccessAction,
  APPROVE_BOOKING,
  BOOKING, bookingFailedAction, bookingSuccessfulAction,
} from "../actions/booking";

const processBookingRequest = async (data, navigate) => {
  return fetch("http://localhost:5001/api/bookings/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("JWT_TOKEN")}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 440) {
          navigate('/sessionExpired');
        } else if (res.status === 401) {
          navigate('/notAuthorized');
        } else {
          navigate('/error');
        }

        return {errors: res.status};
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    })
    .catch(console.log);
};

const processBookingApprove = async (data, navigate) => {
  return fetch("http://localhost:5001/api/bookings/accept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("JWT_TOKEN")}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 440) {
          navigate('/sessionExpired');
        } else if (res.status === 401) {
          navigate('/notAuthorized');
        } else {
          navigate('/error');
        }

        return {errors: res.status};
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    });
};

function* bookingWorker({ payload }) {
  const res = yield call(processBookingRequest, payload.data, payload.navigate);

  if(res.message === 'success') {
    yield put(bookingSuccessfulAction(res.data.id));
  } else {
    yield put(bookingFailedAction(res));
  }
}

export function* bookingWatcher() {
  yield takeEvery(BOOKING, bookingWorker);
}

function* approveBookingWorker({ payload }) {
  const result = yield call(processBookingApprove, {bookId: payload.data}, payload.navigate);

  if (result.message === 'success') {
    yield put(approveBookingSuccessAction());
  } else {
    yield put(approveBookingFailed(result));
  }
}

export function* approveBookingWatcher() {
  yield takeEvery(APPROVE_BOOKING, approveBookingWorker);
}