import React from 'react';
import styles from './PostsContainer.module.css';

const PostsContainer = props => {
    return (
        <div className={`${styles.card} ${props.className}`}>
            {props.children}
        </div>
    );
};

export default PostsContainer;
