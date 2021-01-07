import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let devTools: (a: any) => any =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();
if (
  (process.env.NODE_ENV as any) === 'prod' ||
  process.env.NODE_ENV === 'production'
) {
  devTools = (a) => a;
}

export const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), devTools),
);

sagaMiddleware.run(rootSaga);
