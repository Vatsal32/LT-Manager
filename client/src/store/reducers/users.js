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
const isAdmin1 = localStorage.getItem("isAdmin1") === "true" ? true : false || false;
const isAdmin2 = localStorage.getItem("isAdmin2") === "true" ? true : false || false;
const isAdmin3 = localStorage.getItem("isAdmin3") === "true" ? true : false || false;
const isSuperAdmin = localStorage.getItem("isSuperAdmin") === "true" ? true : false || false;

const initialState = {
  jwtToken: JWT_TOKEN,
  errors: {},
  loggedIn: Boolean(JWT_TOKEN),
  added: false,
  addErrors: {},
  deleted: false,
  deleteErrors: {},
  isAdmin1,
  isAdmin2,
  isAdmin3,
  isSuperAdmin: isSuperAdmin,
};

const UserReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      console.log(action.payload);
      return {
        ...state,
        jwtToken: action.payload.token,
        errors: {},
        loggedIn: true,
        isAdmin3: action.payload.isAdmin3,
        isAdmin1: action.payload.isAdmin1,
        isAdmin2: action.payload.isAdmin2,
        isSuperAdmin: action.payload.superAdmin,
      };
    case LOGIN_UNSUCCESSFUL:
      return {
        ...state,
        jwtToken: "",
        errors: {
          ...action.payload.errors,
        },
        loggedIn: false,
        isAdmin1: false,
        isAdmin2: false,
        isAdmin3: false,
        isSuperAdmin: false,
      };
    case LOGOUT_SUCCESSFUL:
      localStorage.setItem("JWT_TOKEN", "");
      localStorage.setItem("isAdmin1", false);
      localStorage.setItem("isAdmin2", false);
      localStorage.setItem("isAdmin3", false);
      localStorage.setItem("isSuperAdmin", false);
      return {
        ...state,
        errors: {},
        jwtToken: "",
        loggedIn: false,
        isAdmin1: false,
        isAdmin2: false,
        isAdmin3: false,
        isSuperAdmin: false,
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
