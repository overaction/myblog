import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import auths, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
    auths,
    loading,
});

export function* rootSaga() {
    yield all([authSaga()]);
}

export default rootReducer;