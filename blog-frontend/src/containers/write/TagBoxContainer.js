import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { changefield } from '../../modules/write';
import TagBox from '../../components/write/TagBox';

const TagBoxContainer = () => {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.write.tags);

    const onChangeTags = nextTags => {
        dispatch(
            changefield({
                key: 'tags',
                value: nextTags,
            }),
        );
    };

    return <TagBox onChangeTags={onChangeTags} tags={tags} />
}

export default TagBoxContainer;