//* Display All posts

import React from "react";
import PostsContainer from "../../shared/UI/PostsContainer";
import PostItem from "./PostItem";
import styles from './PostList.module.css';

function PostList(props) {

  const posts = props.posts;

  if (!props || props.posts.length === 0) {
    return (
      <div className={styles.p}>
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
        distance={elm.distance && elm.distance}
      />
    );
  });

  return (
    <PostsContainer>
      {postItems}
    </PostsContainer>);
}

export default React.memo(PostList)
