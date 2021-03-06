import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import auths, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';

const rootReducer = combineReducers({
    auths,
    loading,
    user,
    write,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga()]);
}

export default rootReducer;