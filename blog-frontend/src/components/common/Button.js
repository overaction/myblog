import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }
`;

const Button = props => <StyledButton {...props} />;

// 그냥 export default StyledButton 을 해줘도 된다
// 하지만 styled-components로 만든 컴포넌트는 자동 import가 되지 않는다
// 따라서 {...props} 를 통해 Button이 받아오는 props를 모두 StyledButton에 전달하게 렌더링을 했다

export default Button;