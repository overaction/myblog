import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({history}) => {
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auths, user}) => ({
        form: auths.register,
        auth: auths.auth,
        authError: auths.authError,
        user: user.user,
    }));

    console.log(form,`auth: ${auth}`, `authError: ${authError}`);

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value,name} = e.target;
        dispatch(
            changeField('register',name,value)
        )
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        if(password !== passwordConfirm) {
            // 오류처리 예정
            return;
        }
        dispatch(register({username, password}));
    }

    //컴포넌트가 처음 렌더링될 때 form을 초기화 함
    useEffect(() => {
        dispatch(initializeForm('register'));
    },[dispatch]);

    // 회원가입 성공/실패 처리
    useEffect(() => {
        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            return;
        }
        if(auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    },[auth,authError,dispatch]);

    // user 값이 잘 설정되었는지 확인
    // 회원가입에 성공 했다면 홈 화면으로 이동
    useEffect(() => {
        if(user) {
            console.log('check API 성공');
            console.log(user);
            history.push('/'); // 홈화면으로 이동
        }
    }, [history,user]);
    console.log(`user값 : ${user}`);
    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default withRouter(RegisterForm);