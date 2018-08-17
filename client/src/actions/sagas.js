

import axios from 'axios';
import {all,put,takeEvery,fork} from 'redux-saga/effects'
import {gav,meow} from '/actions/index'



export  function* rootSaga() {
    yield all([
        fork(watcher)
    ])
}

export  function* watcher(){
    console.log('watcher');
    yield takeEvery('TEST',testSaga)
}

export function* testSaga(action) {
    console.log('Action',action);
    let test = `${action.payload}WOOOOW`
    try {
        yield put(meow(test))
    }
    catch (e){

    }
}