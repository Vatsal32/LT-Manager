export const LOGIN = "LOGIN";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_UNSUCCESSFUL = "LOGIN_UNSUCCESSFUL";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESSFUL = "LOGOUT_SUCCESSFUL";

export const loginAction = (userName, password) => {
	return ({
		type: LOGIN,
		payload: {
			userName,
			password
		}
	});
};

export const loginSuccessfulAction = (token) => {
	return ({
		type: LOGIN_SUCCESSFUL,
		payload: {
			token,
		}
	});
};

export const loginFailedAction = (errors) => {
	return ({
		type: LOGIN_UNSUCCESSFUL,
		payload: {
			errors
		}
	});
};

export const logoutAction = () => {
	return ({
		type: LOGOUT,
	});
};

export const logoutSuccessfulAction = () => {
	return ({
		type: LOGOUT_SUCCESSFUL,
	});
};