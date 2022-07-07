//* Display a single post
//* Creater, Post image, likes, dislikes, collections, description, comment input bar, comments(replies)

import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import "./post.css";

function Post(props) {
  //* http://localhost:3002/posts/3 ===> postId = 3
  const post = {
    avatar:
      "https://preview.redd.it/3fc3wd5xwf171.png?auto=webp&s=efea2e1ae32067ea07fc547585f64a95171c7902",
    username: "Bob Pants",
    postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
    description: "This is the post's description",
  };

  const params = useParams();
  const { postId } = params;
  const [setLikes, setLikesCount] = useState(10);
  const [setDislikes, setDislikesCount] = useState(1);
  //* Receive post and user info from props

  return (
    <Fragment>
      <h1>Post {postId}</h1>
      <img className="avatar" src={post.avatar} alt="" />
      <p className="username">{post.username} </p>
      <img className="postImage" src={post.postImage} alt="" />
      <div className="buttons">
        <button
          className="thumbsUp"
          onClick={() => setLikesCount((prev) => prev + 1)}
        >
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
        <p> {setLikes}</p>
        <button
          className="thumbsDown"
          onClick={() => setDislikesCount((prev) => prev + 1)}
        >
          <i className="fa-solid fa-thumbs-down"></i>
        </button>
        <p>{setDislikes}</p>
      </div>
      <h2>{post.description}</h2>
      <input type="text" placeholder="comments" />
      <h2>Comments with replies if any</h2>
    </Fragment>
  );
}

export default Post;
