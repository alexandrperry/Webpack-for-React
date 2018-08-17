import {combineReducers} from 'redux';
import testReducer from './testReducer'



const appReducer = combineReducers({
    testReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'ERROR') {
        state = undefined
    }

    return appReducer(state, action)
};
export default rootReducer;
