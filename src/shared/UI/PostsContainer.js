import React from 'react';
import styles from './PostsContainer.module.css';

const PostsContainer = props => {
    return (
        <ul className={`${styles.card} ${props.className} `}>
            {props.children}
        </ul>
    );
};

export default PostsContainer;
