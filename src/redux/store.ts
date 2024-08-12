import {
	legacy_createStore as createStore,
	compose,
	applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	typeof window === 'object' &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const configureStore = () =>
	createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

const store = configureStore();

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export default store;
