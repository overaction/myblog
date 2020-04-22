import React, { Fragment } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

const App = () => {
    return (
        <Fragment>
            <Route component={PostListPage} path={['/@:username','/']} exact />
            <Route component={LoginPage} path="/login" />
            <Route component={RegisterPage} path="/register" />
            <Route component={WritePage} path="/write" />
            <Route component={PostPage} path="/@:username/:postId" />
        </Fragment>
    )
}

// PostListPage 에서처럼 path에 배열을 넣어주면 여러개의 경로를 설정할 수 있다.
// 또한 @:username처럼 @ 를 사용하면 http://localhost:3000/@kmc 같은 경로에서 kmc 를 파라미터로 읽을 수 있게 해준다 

export default App;
