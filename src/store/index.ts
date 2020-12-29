import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(rootSaga);
