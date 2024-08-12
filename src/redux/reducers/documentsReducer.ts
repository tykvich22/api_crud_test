import {
	FETCH_DOCUMENTS_REQUEST,
	FETCH_DOCUMENTS_SUCCESS,
	FETCH_DOCUMENTS_FAILURE,
	ADD_DOCUMENT_REQUEST,
	ADD_DOCUMENT_SUCCESS,
	ADD_DOCUMENT_FAILURE,
	DELETE_DOCUMENT_REQUEST,
	DELETE_DOCUMENT_SUCCESS,
	DELETE_DOCUMENT_FAILURE,
	EDIT_DOCUMENT_REQUEST,
	EDIT_DOCUMENT_SUCCESS,
	EDIT_DOCUMENT_FAILURE,
	SET_CURRENT_DOCUMENT,
	DocumentActionTypes,
	Document,
} from '../actions/documentsActions';

export interface DocumentsState {
	documents: Document[];
	currentDocument: Document | null;
	loading: boolean;
	error: string | null;
}

const initialState: DocumentsState = {
	documents: [],
	currentDocument: null,
	loading: false,
	error: null,
};

export const documentsReducer = (
	state = initialState,
	action: DocumentActionTypes
): DocumentsState => {
	switch (action.type) {
		case FETCH_DOCUMENTS_REQUEST:
		case ADD_DOCUMENT_REQUEST:
		case DELETE_DOCUMENT_REQUEST:
		case EDIT_DOCUMENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_DOCUMENTS_SUCCESS:
			return {
				...state,
				documents: action.payload,
				loading: false,
			};
		case ADD_DOCUMENT_SUCCESS:
			return {
				...state,
				documents: [...state.documents, action.payload],
				loading: false,
			};
		case DELETE_DOCUMENT_SUCCESS:
			return {
				...state,
				documents: state.documents.filter(
					(document) => document.id !== action.payload
				),
				loading: false,
				currentDocument: null,
			};
		case EDIT_DOCUMENT_SUCCESS:
			return {
				...state,
				documents: state.documents.map((document) =>
					document.id === action.payload.id ? { ...action.payload } : document
				),
				loading: false,
			};
		case FETCH_DOCUMENTS_FAILURE:
		case ADD_DOCUMENT_FAILURE:
		case DELETE_DOCUMENT_FAILURE:
		case EDIT_DOCUMENT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case SET_CURRENT_DOCUMENT:
			return {
				...state,
				currentDocument: action.payload,
			};
		default:
			return state;
	}
};
