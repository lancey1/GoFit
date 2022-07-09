//* Display All posts

import React from "react";
import PostsContainer from "../../shared/UI/PostsContainer";
import PostItem from "./PostItem";



function PostList(props) {

  if (props.posts.length === 0) {
    return (
      <div>
        No posts yet.
      </div>)
  }


  const postItems = props.posts.map((elm) => {
    return (
      <PostItem
        key={elm.id}
        id={elm.id}
        avatar={elm.avatar}
        username={elm.username}
        postImage={elm.postImage}
      // any other props
      />
    );
  });

  return (
    <PostsContainer>
      {postItems}
    </PostsContainer>);
}

export default PostList;
