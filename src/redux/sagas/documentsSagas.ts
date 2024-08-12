import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
	FETCH_DOCUMENTS_REQUEST,
	fetchDocumentsSuccess,
	fetchDocumentsFailure,
	ADD_DOCUMENT_REQUEST,
	addDocumentSuccess,
	addDocumentFailure,
	DELETE_DOCUMENT_REQUEST,
	deleteDocumentSuccess,
	deleteDocumentFailure,
	EDIT_DOCUMENT_REQUEST,
	editDocumentSuccess,
	editDocumentFailure,
	AddDocumentRequestAction,
	DeleteDocumentRequestAction,
	EditDocumentRequestAction,
} from '../actions/documentsActions';
import { api } from '../../api';
import { Document } from '../actions/documentsActions';
import { selectToken } from '../selectors';

function* fetchDocumentsSaga() {
	const token: string = yield select(selectToken);
	try {
		const documents: { data: Document[] } = yield call(api, {
			path: '/ru/data/v3/testmethods/docs/userdocs/get',
			token,
		});
		yield put(fetchDocumentsSuccess(documents.data));
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		yield put(fetchDocumentsFailure(errorMessage));
	}
}

function* addDocumentSaga(action: AddDocumentRequestAction) {
	try {
		const token: string = yield select(selectToken);
		const document: { data: Document } = yield call(api, {
			path: '/ru/data/v3/testmethods/docs/userdocs/create',
			token,
			method: 'POST',
			body: action.payload,
		});
		yield put(addDocumentSuccess(document.data));
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		yield put(addDocumentFailure(errorMessage));
	}
}

function* deleteDocumentSaga(action: DeleteDocumentRequestAction) {
	try {
		const token: string = yield select(selectToken);
		yield call(api, {
			path: `/ru/data/v3/testmethods/docs/userdocs/delete/${action.payload}`,
			token,
			method: 'POST',
		});

		yield put(deleteDocumentSuccess(action.payload));
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		yield put(deleteDocumentFailure(errorMessage));
	}
}

function* editDocumentSaga(action: EditDocumentRequestAction) {
	try {
		const token: string = yield select(selectToken);
		const { id, body } = action.payload;
		const document: { data: Document } = yield call(api, {
			path: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
			token,
			method: 'POST',
			body,
		});
		yield put(editDocumentSuccess(document.data));
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		yield put(editDocumentFailure(errorMessage));
	}
}

export function* watchDocumentsSaga() {
	yield takeLatest(FETCH_DOCUMENTS_REQUEST, fetchDocumentsSaga);
	yield takeLatest(ADD_DOCUMENT_REQUEST, addDocumentSaga);
	yield takeLatest(DELETE_DOCUMENT_REQUEST, deleteDocumentSaga);
	yield takeLatest(EDIT_DOCUMENT_REQUEST, editDocumentSaga);
}
