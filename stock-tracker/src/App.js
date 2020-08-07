import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import './App.css';
import { rootReducer } from './reducers/rootReducer.js';
import { rootSaga } from './sagas/rootSaga.js';
import StockTracker from './StockTracker';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
        <StockTracker />
    </ Provider >
  );
}

export default App;
