//* Display a post view
//* Creater, Post image, likes, title

import { useHistory } from "react-router-dom";
import PostCard from "../../shared/UI/PostCard";
import "./postItem.css";

function PostItem(props) {
  console.log({ props });
  //* Get image, title, likes count, creator info from props(PostList)

  const history = useHistory();

  //? Click on a post card will take you to the post detail
  const postClickHandler = () => {
    history.push(`/posts/:postId`);
  };

  return (
    <PostCard onClick={postClickHandler}>
      <img className= "avatarlist" src={props.avatar} alt="" />
      <p>{props.username}</p>
      <img className= "postImagelist" src={props.postImage} alt="" />
    </PostCard>
  );
}

export default PostItem;
