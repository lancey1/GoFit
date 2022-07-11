import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TimeAgo from '../../shared/components/TimeAgo';
import styles from './CommentItem.module.css';

function CommentItem(props) {

    const { id, creator, text, date, replies, likes, likedBy } = props;

    let hours = Math.floor(((new Date().getTime()) - new Date(date).getTime()) / (3600000))

    return (
        <Fragment>
            <div className={`${styles.container}`}>
                <div>
                    <Link to={`/user/${creator.id}`} target="_blank" rel="noopener noreferrer" >
                        <img className={`${styles.avatar}`} src={creator.image} alt="creator" />
                    </Link>
                </div>

                <div className={`${styles.name_text}`}>
                    <p>{creator.name}</p>
                    <p className={`${styles.text}`}>{text}</p>
                </div>

                <div className={`${styles.icon_with_p}`}>
                    <svg className={`${styles.clickable_likes} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <div>
                        <p>{likes}</p>
                    </div>
                </div>
            </div>

            {/* Check is replies is empty */}
            <button>Load replies</button>
            <p>{<TimeAgo date={date} />} <i> @{creator.address.split(',').slice(-2).join(', ')}</i></p>
            <hr />
        </Fragment>

    )
}

export default React.memo(CommentItem);