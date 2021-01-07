import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
let devTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'production') {
  devTools = () => {};
}

export const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), devTools),
);

sagaMiddleware.run(rootSaga);
