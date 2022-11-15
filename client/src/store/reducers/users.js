import {LOGIN_SUCCESSFUL, LOGIN_UNSUCCESSFUL, LOGOUT_SUCCESSFUL} from "../actions/users";

const JWT_TOKEN = localStorage.getItem('JWT_TOKEN');
const userId = localStorage.getItem('userID');

const initialState = {
	jwtToken: JWT_TOKEN,
	errors: {},
	loggedIn: false,
	userId: userId || ''
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESSFUL:
			return ({
				...state,
				jwtToken: action.payload.token,
				errors: {},
				loggedIn: true,
			});
		case LOGIN_UNSUCCESSFUL:
			return ({
				...state,
				jwtToken: '',
				errors: {
					...action.payload.errors,
				},
				loggedIn: false,
			});
		case LOGOUT_SUCCESSFUL:
			return ({
				...state,
				errors: {},
				jwtToken: '',
				loggedIn: false,
				userId: ''
			});
		default:
			return state;
	}
};

export default UserReducer;