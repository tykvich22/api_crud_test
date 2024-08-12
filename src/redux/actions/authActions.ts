export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

interface LoginRequestAction {
	type: typeof LOGIN_REQUEST;
	payload: {
		username: string;
		password: string;
	};
}

interface LoginSuccessAction {
	type: typeof LOGIN_SUCCESS;
	payload: {
		username: string;
		token: string;
	};
}

interface LoginFailureAction {
	type: typeof LOGIN_FAILURE;
	payload: {
		error: string;
	};
}

interface LogoutAction {
	type: typeof LOGOUT;
}

export type AuthAction =
	| LoginRequestAction
	| LoginSuccessAction
	| LoginFailureAction
	| LogoutAction;

export const loginRequest = (
	username: string,
	password: string
): LoginRequestAction => ({
	type: LOGIN_REQUEST,
	payload: { username, password },
});

export const loginSuccess = (
	username: string,
	token: string
): LoginSuccessAction => ({
	type: LOGIN_SUCCESS,
	payload: { username, token },
});

export const loginFailure = (error: string): LoginFailureAction => ({
	type: LOGIN_FAILURE,
	payload: { error },
});

export const logout = (): LogoutAction => ({
	type: LOGOUT,
});
