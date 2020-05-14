import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({history}) => {
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auths, user}) => ({
        form: auths.login,
        auth: auths.auth,
        authError: auths.authError,
        user: user.user,
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value,name} = e.target;
        dispatch(
            changeField('login',name,value),
        )
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password} = form;
        dispatch(login({username, password}));
    }

    //컴포넌트가 처음 렌더링될 때 form을 초기화 함
    useEffect(() => {
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(() => {
        if(authError) {
            console.log('오류 발생');
            console.log('authError');
            setError('로그인 실패');
            return;
        }
        if(auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
    },[auth,authError,dispatch]);

    useEffect(() => {
        if(user) {
            history.pushState('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('error.. localstorage is not working');
            }
        }
    },[history,user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    )
}

export default withRouter(LoginForm);