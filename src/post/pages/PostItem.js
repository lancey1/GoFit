//* Display a post view
//* Creater, Post image, likes, title

import PostCard from "../../shared/UI/PostCard";

function PostItem(props) {

    //* Get image, title, likes count, creator info from props(PostList)

    return (
        <PostCard>
            <h2>Image</h2>
            <h4>Title</h4>
            <p>Creator avatar and name + likes</p>
        </PostCard>
    )
};

export default PostItem;