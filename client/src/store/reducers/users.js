import {
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESSFUL,
  LOGIN_SUCCESSFUL,
  LOGIN_UNSUCCESSFUL,
  LOGOUT_SUCCESSFUL,
  USER_ADDED_SUCCESSFULLY,
  USER_ADD_FAILED,
} from "../actions/users";

const JWT_TOKEN = localStorage.getItem("JWT_TOKEN");

const initialState = {
  jwtToken: JWT_TOKEN,
  errors: {},
  loggedIn: Boolean(JWT_TOKEN),
  added: false,
  addErrors: {},
  deleted: false,
  deleteErrors: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        jwtToken: action.payload.token,
        errors: {},
        loggedIn: true,
      };
    case LOGIN_UNSUCCESSFUL:
      return {
        ...state,
        jwtToken: "",
        errors: {
          ...action.payload.errors,
        },
        loggedIn: false,
      };
    case LOGOUT_SUCCESSFUL:
      return {
        ...state,
        errors: {},
        jwtToken: "",
        loggedIn: false,
      };
    case USER_ADDED_SUCCESSFULLY:
      return {
        ...state,
        added: true,
        addErrors: {},
      };
    case USER_ADD_FAILED:
      return {
        ...state,
        added: false,
        addErrors: {
          ...action.payload,
        },
      };
    case DELETE_USER_SUCCESSFUL:
      return {
        ...state,
        deleted: true,
        deleteErrors: {},
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        deleted: false,
        deleteErrors: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default UserReducer;
