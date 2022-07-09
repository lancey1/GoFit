import React from 'react';
import styles from './PostCard.module.css';

const PostCard = props => {
    return (
        <li className={`${styles.card} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </li>
    );
};

export default PostCard;
