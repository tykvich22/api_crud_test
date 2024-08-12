import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	AuthAction,
} from '../actions/authActions';

export interface AuthState {
	username: string;
	token: string;
	loading: boolean;
	error: string | null;
}

const getInitialState = (): AuthState => {
	const userJson = localStorage.getItem('user');
	if (userJson) {
		const user = JSON.parse(userJson);

		return {
			...user,
			loading: false,
			error: null,
		};
	}

	return {
		username: '',
		token: '',
		loading: false,
		error: null,
	};
};

const initialState = getInitialState();

export const authReducer = (
	state = initialState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, loading: true, error: null };
		case LOGIN_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				token: action.payload.token,
				loading: false,
			};
		case LOGIN_FAILURE:
			return { ...state, error: action.payload.error, loading: false };
		case LOGOUT:
			return { username: '', token: '', loading: false, error: null };
		default:
			return state;
	}
};
