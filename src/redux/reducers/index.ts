import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { documentsReducer } from './documentsReducer';

const reducer = combineReducers({
	auth: authReducer,
	documents: documentsReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
