import React from 'react'
import styles from './PostDetails.module.css';

function PostDetails(props) {

    const post = props.post

    return (
        <div>
            <div >
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
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.clickable_cols} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <div>
                                <p>{post.dislikes}</p>
                            </div>
                        </div>

                        <div className={`${styles.icon_with_p}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.clickable_comments} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <div>
                                <p>{post.collections}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails