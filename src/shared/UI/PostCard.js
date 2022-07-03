import React from 'react';
import styles from './PostCard.module.css';

const PostCard = props => {
    return (
        <div className={`${styles.card} ${props.className}`}>
            {props.children}
        </div>
    );
};

export default PostCard;
