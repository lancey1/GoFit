//* Display All posts

import React from "react";
import PostsContainer from "../../shared/UI/PostsContainer";
import PostItem from "./PostItem";

function PostList() {
    return (
        <PostsContainer>
            <PostItem />
            <PostItem />
            <PostItem />
        </PostsContainer>
    )
};

export default PostList;