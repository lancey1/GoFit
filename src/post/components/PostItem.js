//* Display a post view
//* Creater, Post image, likes, title

import { useHistory } from "react-router-dom";
import PostCard from "../../shared/UI/PostCard";

function PostItem(props) {

    //* Get image, title, likes count, creator info from props(PostList)

    const history = useHistory();

    //? Click on a post card will take you to the post detail
    const postClickHandler = () => {
        history.push(`/posts/:postId`);
    }

    return (
        <PostCard onClick={postClickHandler}>
            <h2>Image</h2>
            <h4>Title</h4>
            <p>Creator avatar and name + likes</p>
        </PostCard>
    )
};

export default PostItem;