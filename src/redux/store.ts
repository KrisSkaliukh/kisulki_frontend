import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { RootReducer } from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const saga = createSagaMiddleware();
const enhancer = compose(
  composeWithDevTools(applyMiddleware(saga)),
);
const store = createStore(RootReducer, enhancer);
saga.run(rootSaga);

export default store;
