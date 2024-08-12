import { call, put, takeLatest } from 'redux-saga/effects';
import {
	LOGIN_REQUEST,
	loginFailure,
	loginSuccess,
} from '../actions/authActions';
import { api } from '../../api';

interface LoginAction {
	type: typeof LOGIN_REQUEST;
	payload: {
		username: string;
		password: string;
	};
}

interface SuccessResponse {
	data: {
		token: string;
	};
	error_code: 0;
}

interface ErrorResponse {
	data: null;
	error_code: number;
	error_text: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
	return response.error_code === 0;
}

function isErrorResponse(response: ApiResponse): response is ErrorResponse {
	return response.error_code !== 0;
}

function* loginSaga(action: LoginAction) {
	try {
		const response: ApiResponse = yield call(api, {
			path: '/ru/data/v3/testmethods/docs/login',
			method: 'POST',
			body: {
				username: action.payload.username,
				password: action.payload.password,
			},
		});

		if (isSuccessResponse(response)) {
			localStorage.setItem(
				'user',
				JSON.stringify({
					username: action.payload.username,
					token: response.data.token,
				})
			);
			yield put(loginSuccess(action.payload.username, response.data.token));
		} else if (isErrorResponse(response)) {
			yield put(loginFailure(response.error_text));
		}
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		yield put(loginFailure(errorMessage));
	}
}

export function* watchAuthSaga() {
	yield takeLatest(LOGIN_REQUEST, loginSaga);
}
