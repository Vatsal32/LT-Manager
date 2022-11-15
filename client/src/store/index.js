import { all } from "redux-saga/effects";
import UserReducer from "./reducers/users";
import { loginWatcher, logoutWatcher } from "./sagas/users";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { bookingWatcher } from "./sagas/booking";
import BookingReducer from "./reducers/booking";

const rootReducer = combineReducers({
  users: UserReducer,
  booking: BookingReducer,
});

function* rootSagas() {
  yield all([loginWatcher(), logoutWatcher(), bookingWatcher()]);
}

const sagaMiddleWare = createSagaMiddleware();

const storeMiddleware = composeWithDevTools(
  applyMiddleware(sagaMiddleWare, thunk)
);

export default createStore(rootReducer, storeMiddleware);
sagaMiddleWare.run(rootSagas);
