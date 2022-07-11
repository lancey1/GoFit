//* Display a single post
//* Creater, Post image, likes, dislikes, collections, description, comment input bar, comments(replies)

import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/ErrorModal";

import "./post.css";

const post = {
  avatar:
    "https://preview.redd.it/3fc3wd5xwf171.png?auto=webp&s=efea2e1ae32067ea07fc547585f64a95171c7902",
  username: "Bob Pants",
  postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
  description: "This is the post's description",
};

function Post(props) {
  //* http://localhost:3002/posts/3 ===> postId = 3

  const params = useParams();
  const { postId } = params;
  const [setLikes, setLikesCount] = useState(10);
  const [setDislikes, setDislikesCount] = useState(1);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  //* Receive post and user info from props

  useEffect(() => {
    (async () => {
      try {
        setIsloading(true);
        let response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        let responseData = await response.json();
        setIsloading(false);
        if (!response.ok) {
          throw new Error(responseData.message);
        };
        console.log(responseData)
        setPost(responseData.post);
      } catch (error) {
        console.log(error)
        setError(error.message);
      }
      setIsloading(false);
    })();
  }, [])

  return (
    <Fragment>

      {error && <ErrorModal error={error} onClear={() => setError(null)} />}
      {post &&
        <div>
          <h1>Post {postId}</h1>
          <img className="avatar" src={post.creator.image} alt="" />
          <p className="username">{post.name} </p>
          <img className="postImage" src={post.image} alt="" />
          <div className="buttons">
            <button
              className="thumbsUp"
              onClick={() => setLikesCount((prev) => prev + 1)}
            >
              <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <p> {post.likes}</p>
            <button
              className="thumbsDown"
              onClick={() => setDislikesCount((prev) => prev + 1)}
            >
              <i className="fa-solid fa-thumbs-down"></i>
            </button>
            <p>{post.dislikes}</p>
          </div>
          <h2>{post.description}</h2>
          <input type="text" placeholder="comments" />
          <h2>Comments with replies if any</h2>
        </div>
      }


    </Fragment>
  );
}

export default Post;
