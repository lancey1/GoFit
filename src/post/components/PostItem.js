//* Display a post view
//* Creater, Post image, likes, title

import { useHistory } from "react-router-dom";
import PostCard from "../../shared/UI/PostCard";
import styles from "./postItem.module.css";

function PostItem(props) {
  //* Get image, title, likes count, creator info from props(PostList)

  const history = useHistory();

  //? Click on a post card will take you to the post detail
  const postClickHandler = () => {
    history.push(`/posts/${props.id}`);
  };

  const likeClikeHandler = event => {
    event.stopPropagation();
    console.log('Clicked on SVG');
  }

  const clickUserDetailHandler = event => {
    event.stopPropagation();
    console.log('Clicked on user info.')
  }

  return (
    <PostCard >
      <img className={`${styles.image}`} onClick={postClickHandler} src={props.postImage} alt="" />
      <p className={`${styles.h4}`}>THIS IS POST TITLETHIS IS POST TITLETHIS IS POST TITLE</p>
      <div className={`${styles.creatorinfo}`}>
        <div className={`${styles.imageandname} ${styles.clickable}`} onClick={clickUserDetailHandler}>
          <img className={`${styles.avatar}`} src={props.avatar} alt="" />
          <div>
            <p>{props.username}</p>
          </div>
        </div>
        <div className={`${styles.likes}`}>
          <svg onClick={likeClikeHandler} className={`${styles.clickable} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div>
            <p>0</p>
          </div>
        </div>
      </div>
    </PostCard >
  );
}

export default PostItem;
