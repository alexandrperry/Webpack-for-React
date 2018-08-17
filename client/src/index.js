import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.sass';
import App from "./components/App";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas'


const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)







ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('app'));

module.hot.accept();