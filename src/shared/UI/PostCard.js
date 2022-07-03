import React from 'react';
import styles from './PostCard.module.css';

const PostCard = props => {
    return (
        <div className={`${styles.card} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default PostCard;
