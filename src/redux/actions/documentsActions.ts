export const FETCH_DOCUMENTS_REQUEST = 'FETCH_DOCUMENTS_REQUEST';
export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_FAILURE = 'FETCH_DOCUMENTS_FAILURE';

export const ADD_DOCUMENT_REQUEST = 'ADD_DOCUMENT_REQUEST';
export const ADD_DOCUMENT_SUCCESS = 'ADD_DOCUMENT_SUCCESS';
export const ADD_DOCUMENT_FAILURE = 'ADD_DOCUMENT_FAILURE';

export const DELETE_DOCUMENT_REQUEST = 'DELETE_DOCUMENT_REQUEST';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';

export const EDIT_DOCUMENT_REQUEST = 'EDIT_DOCUMENT_REQUEST';
export const EDIT_DOCUMENT_SUCCESS = 'EDIT_DOCUMENT_SUCCESS';
export const EDIT_DOCUMENT_FAILURE = 'EDIT_DOCUMENT_FAILURE';

export const SET_CURRENT_DOCUMENT = 'SET_CURRENT_DOCUMENT';

export interface Document {
	id?: string;
	documentStatus: string;
	employeeNumber: string;
	documentType: string;
	documentName: string;
	companySignatureName: string;
	employeeSignatureName: string;
	employeeSigDate?: string;
	companySigDate?: string;
}

interface FetchDocumentsRequestAction {
	type: typeof FETCH_DOCUMENTS_REQUEST;
}

interface FetchDocumentsSuccessAction {
	type: typeof FETCH_DOCUMENTS_SUCCESS;
	payload: Document[];
}

interface FetchDocumentsFailureAction {
	type: typeof FETCH_DOCUMENTS_FAILURE;
	payload: string;
}

export interface AddDocumentRequestAction {
	type: typeof ADD_DOCUMENT_REQUEST;
	payload: Document;
}

interface AddDocumentSuccessAction {
	type: typeof ADD_DOCUMENT_SUCCESS;
	payload: Document;
}

interface AddDocumentFailureAction {
	type: typeof ADD_DOCUMENT_FAILURE;
	payload: string;
}

export interface DeleteDocumentRequestAction {
	type: typeof DELETE_DOCUMENT_REQUEST;
	payload: string;
}

interface DeleteDocumentSuccessAction {
	type: typeof DELETE_DOCUMENT_SUCCESS;
	payload: string;
}

interface DeleteDocumentFailureAction {
	type: typeof DELETE_DOCUMENT_FAILURE;
	payload: string;
}

export interface EditDocumentRequestAction {
	type: typeof EDIT_DOCUMENT_REQUEST;
	payload: {
		id: string | undefined;
		body: Document;
	};
}

interface EditDocumentSuccessAction {
	type: typeof EDIT_DOCUMENT_SUCCESS;
	payload: Document;
}

interface EditDocumentFailureAction {
	type: typeof EDIT_DOCUMENT_FAILURE;
	payload: string;
}

interface SetCurrentDocument {
	type: typeof SET_CURRENT_DOCUMENT;
	payload: Document | null;
}

export type DocumentActionTypes =
	| FetchDocumentsRequestAction
	| FetchDocumentsSuccessAction
	| FetchDocumentsFailureAction
	| AddDocumentRequestAction
	| AddDocumentSuccessAction
	| AddDocumentFailureAction
	| DeleteDocumentRequestAction
	| DeleteDocumentSuccessAction
	| DeleteDocumentFailureAction
	| EditDocumentRequestAction
	| EditDocumentSuccessAction
	| EditDocumentFailureAction
	| SetCurrentDocument;

export const fetchDocumentsRequest = (): FetchDocumentsRequestAction => ({
	type: FETCH_DOCUMENTS_REQUEST,
});

export const fetchDocumentsSuccess = (
	documents: Document[]
): FetchDocumentsSuccessAction => ({
	type: FETCH_DOCUMENTS_SUCCESS,
	payload: documents,
});

export const fetchDocumentsFailure = (
	error: string
): FetchDocumentsFailureAction => ({
	type: FETCH_DOCUMENTS_FAILURE,
	payload: error,
});

export const addDocumentRequest = (
	document: Document
): AddDocumentRequestAction => ({
	type: ADD_DOCUMENT_REQUEST,
	payload: document,
});

export const addDocumentSuccess = (
	document: Document
): AddDocumentSuccessAction => ({
	type: ADD_DOCUMENT_SUCCESS,
	payload: document,
});

export const addDocumentFailure = (
	error: string
): AddDocumentFailureAction => ({
	type: ADD_DOCUMENT_FAILURE,
	payload: error,
});

export const deleteDocumentRequest = (
	documentId: string
): DeleteDocumentRequestAction => ({
	type: DELETE_DOCUMENT_REQUEST,
	payload: documentId,
});

export const deleteDocumentSuccess = (
	documentId: string
): DeleteDocumentSuccessAction => ({
	type: DELETE_DOCUMENT_SUCCESS,
	payload: documentId,
});

export const deleteDocumentFailure = (
	error: string
): DeleteDocumentFailureAction => ({
	type: DELETE_DOCUMENT_FAILURE,
	payload: error,
});

export const editDocumentRequest = (
	id: string | undefined,
	body: Document
): EditDocumentRequestAction => ({
	type: EDIT_DOCUMENT_REQUEST,
	payload: {
		id,
		body,
	},
});

export const editDocumentSuccess = (
	document: Document
): EditDocumentSuccessAction => ({
	type: EDIT_DOCUMENT_SUCCESS,
	payload: document,
});

export const editDocumentFailure = (
	error: string
): EditDocumentFailureAction => ({
	type: EDIT_DOCUMENT_FAILURE,
	payload: error,
});

export const setCurrentDocument = (
	document: Document | null
): SetCurrentDocument => ({
	type: SET_CURRENT_DOCUMENT,
	payload: document,
});
