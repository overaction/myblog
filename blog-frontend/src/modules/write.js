import {createAction, handleActions} from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; //특정 key 값 바꾸기

export const initialize = createAction(INITIALIZE);
export const changefield = createAction(CHANGE_FIELD, ({key, value}) => ({
    key: key,
    value,
}));

const initialState = {
    title: '',
    body: '',
    tags: [],
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, {payload: {key,value}}) => ({
            ...state,
            [key]: value,
        })
    },
    initialState
);

export default write;