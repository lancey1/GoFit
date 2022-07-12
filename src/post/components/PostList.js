//* Display All posts

import React from "react";
import PostsContainer from "../../shared/UI/PostsContainer";
import PostItem from "./PostItem";

function PostList(props) {

  console.log(props);
  const posts = props.posts;

  if (!props || props.posts.length === 0) {
    return (
      <div>
        No posts yet.
      </div>)
  }

  const postItems = posts.map((elm) => {
    return (
      <PostItem
        key={elm.id}
        id={elm.id}
        title={elm.title}
        avatar={elm.creator.image}
        username={elm.creator.name}
        postImage={elm.image}
        likes={elm.likes}
        likedBy={elm.likedBy}
      />
    );
  });

  return (
    <PostsContainer>
      {postItems}
    </PostsContainer>);
}

export default PostList;
