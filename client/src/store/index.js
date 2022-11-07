import { all } from "redux-saga/effects";
import UserReducer from "./reducers/users";
import {loginWatcher, logoutWatcher} from "./sagas/users";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  users: UserReducer,
});

function* rootSagas() {
  yield all([loginWatcher(), logoutWatcher()]);
}

const sagaMiddleWare = createSagaMiddleware();

const storeMiddleware = composeWithDevTools(
  applyMiddleware(sagaMiddleWare, thunk)
);

export default createStore(rootReducer, storeMiddleware);
sagaMiddleWare.run(rootSagas);