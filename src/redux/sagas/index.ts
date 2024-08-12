import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSagas';
import { watchDocumentsSaga } from './documentsSagas';

export default function* rootSaga() {
	yield all([fork(watchAuthSaga), fork(watchDocumentsSaga)]);
}
