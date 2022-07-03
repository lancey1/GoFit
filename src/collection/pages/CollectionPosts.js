import React from 'react'
import { useParams } from 'react-router-dom'
import PostList from '../../post/components/PostList';

const CollectionPosts = (props) => {

    const params = useParams();
    const { collectionId } = params;

    return (
        <div>
            CollectionPosts
            <p>{collectionId}</p>
            <PostList />
        </div>
    )
}

export default CollectionPosts