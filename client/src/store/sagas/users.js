import {takeEvery, call, put} from "redux-saga/effects";
import {LOGIN, loginFailedAction, loginSuccessfulAction, LOGOUT, logoutSuccessfulAction} from "../actions/users";


const processLoginRequest = async (data) => {
	return fetch('http://localhost:5001/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	}).then(res => res.json()).then(res => {
		if (res.errors) {
			return res.errors;
		} else {
			return res.data;
		}
	}).catch(console.log);
};

function* loginWorker({payload}) {
	const res = yield call(processLoginRequest, payload);

	if (res.token) {
		localStorage.setItem('JWT_TOKEN', res.token);
		yield put(loginSuccessfulAction(res.token));
	} else {
		yield put(loginFailedAction({...res}));
	}
}

export function* loginWatcher() {
	yield takeEvery(LOGIN, loginWorker);
}

function* logoutWorker() {
	localStorage.setItem('JWT_TOKEN', '');
	yield put(logoutSuccessfulAction());
}

export function* logoutWatcher() {
	yield takeEvery(LOGOUT, logoutWorker);
}
