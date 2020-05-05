import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import auths, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';

const rootReducer = combineReducers({
    auths,
    loading,
    user,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga()]);
}

export default rootReducer;