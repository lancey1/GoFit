//* Display a single post
//* Creater, Post image, likes, dislikes, collections, description, comment input bar, comments(replies)

import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../../comment/components/CommentsList";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";

import styles from './Post.module.css';

const post = {
  avatar:
    "https://preview.redd.it/3fc3wd5xwf171.png?auto=webp&s=efea2e1ae32067ea07fc547585f64a95171c7902",
  username: "Bob Pants",
  postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
  description: "This is the post's description",
};

function Post(props) {
  //* http://localhost:3002/posts/3 ===> postId = 3

  const auth = useContext(AuthContext);

  const params = useParams();
  const { postId } = params;
  const [setLikes, setLikesCount] = useState(10);
  const [setDislikes, setDislikesCount] = useState(1);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
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
        setComments(responseData.post.comments);
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
        <div className={`${styles.container}`}>

          <div className={styles.div}>

            <img className={`${styles.post_image}`} src={post.image} alt="Post" />

            <div className={`${styles.post_details}`}>
              <p>{new Date(post.date).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}<br /> @ {post.address.split(',').slice(-3).join(', ')}</p>

              <div className={`${styles.icons_div}`} >

                <div className={`${styles.icon_with_p}`}>
                  <svg className={`${styles.clickable_likes} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <div>
                    <p>{post.likes}</p>
                  </div>
                </div>

                <div className={`${styles.icon_with_p}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.clickable_cols} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <div>
                    <p>{post.dislikes}</p>
                  </div>
                </div>

                <div className={`${styles.icon_with_p}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.clickable_comments} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div>
                    <p>{post.collections}</p>
                  </div>
                </div>


              </div>
            </div>

          </div>

          <section className={`${styles.post_info}`} >
            <div className={`${styles.user_img_name_follow}`}>
              <img className={`${styles.avatar}`} src={post.creator.image} alt="" />
              <div className={`${styles.name_follow}`}>
                <h3>{post.creator.name}</h3>
                <button className={`${styles.follow_btn}`}>Follow</button>
              </div>
            </div>

            <article className={`${styles.article}`} >
              <h2 >{post.title}</h2>
              <p>{post.description}</p>
              <div className={`${styles.btn_div}`} >
                <button className={`${styles.dislike_btn}`}>Dislike</button>
              </div>
              <hr />
            </article>

            <section>
              <i>{comments.length} comments</i>
              <input className={`${styles.comment_input}`} type="text" placeholder="Leave a comment?" />
              <CommentsList comments={comments} />
            </section>

          </section>

        </div>
      }

    </Fragment>
  );
}

export default React.memo(Post);
