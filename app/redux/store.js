import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from 'app/redux/reducers';
import sagas from 'app/redux/sagas';

const createStore = reduxCreateStore;
let sagaMiddleware;

sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

// const store = createStore(reducers);


export default store;
