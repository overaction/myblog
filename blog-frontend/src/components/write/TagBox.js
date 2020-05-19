import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;

    h4 {
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[9]};
    input,
    button {
        outline: none;
        border: none;
        font-size: 1rem;
    }
    
    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }
  button {
      cursor: pointer;
      padding-right: 1rem;
      padding-left: 1rem;
      border: none;
      background: ${palette.gray[8]};
      color: white;
      font-weight: bold;
      &:hover {
          background: ${palette.gray[6]};
      }
  }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

//React.memo 사용으로 tag값이 바뀔 때만 리렌더링
const TagItem = React.memo(({tag, onRemove}) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

//React.memo 사용으로 tags값이 바뀔 때만 리렌더링
const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
));

const TagBox = ({tags, onChangeTags}) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    //useCallback 을 사용해서 localTags가 변할 때만 함수 재호출
    const insertTag = useCallback(tag => {
        if(!tag) return; //공백은 추가 안함
        if(localTags.includes(tag)) return; //중복은 추가 안함
        const nextTags = [...localTags, tag];
        setLocalTags(nextTags);
        onChangeTags(nextTags);
    },[localTags,onChangeTags]);

    const onRemove = useCallback(tag => {
        const nextTags = localTags.filter(tg => tg !== tag);
        setLocalTags(nextTags);
        onChangeTags(nextTags);
    },[localTags,onChangeTags]);

    const onChange = useCallback(e => {
        setInput(e.target.value);
    },[]);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        insertTag(input.trim()); //앞뒤 공백을 제거하고 등록
        setInput('');
    },[input,insertTag]);

    // tags 값이 바뀔 때
    useEffect(() => {
        setLocalTags(tags);
    },[tags]);

    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input placeholder="태그를 입력하세요" value={input} onChange={onChange}/>
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove} />
        </TagBoxBlock>
    )
}

export default TagBox;