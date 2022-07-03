//* Display a single post
//* Creater, Post image, likes, dislikes, collections, description, comment input bar, comments(replies)


import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

function Post(props) {
    //* http://localhost:3002/posts/3 ===> postId = 3
    const params = useParams();
    const { postId } = params;

    //* Receive post and user info from props

    return (
        <Fragment>
            <h1>{postId}</h1>
            <h1>Creator avatar and name</h1>
            <h2>Image</h2>
            <p>likes, dislikes, collections</p>
            <h2>Title</h2>
            <h2>Description</h2>
            <input type='text' placeholder="comment input" />
            <h2>Comments with replies if any</h2>
        </Fragment>
    )
};

export default Post;