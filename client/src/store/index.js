import { all } from "redux-saga/effects";
import UserReducer from "./reducers/users";
import {
  addUserWatcher,
  deleteUserWatcher,
  loginWatcher,
  logoutWatcher,
} from "./sagas/users";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { approveBookingWatcher, bookingWatcher } from "./sagas/booking";
import BookingReducer from "./reducers/booking";
import RoomReducer from "./reducers/rooms";
import { addRoomWatcher } from "./sagas/rooms";

const rootReducer = combineReducers({
  users: UserReducer,
  booking: BookingReducer,
  rooms: RoomReducer,
});

function* rootSagas() {
  yield all([
    loginWatcher(),
    logoutWatcher(),
    bookingWatcher(),
    addUserWatcher(),
    deleteUserWatcher(),
    addRoomWatcher(),
    approveBookingWatcher()
  ]);
}

const sagaMiddleWare = createSagaMiddleware();

const storeMiddleware = composeWithDevTools(
  applyMiddleware(sagaMiddleWare, thunk)
);

export default createStore(rootReducer, storeMiddleware);
sagaMiddleWare.run(rootSagas);
