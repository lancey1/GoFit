import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import TimeAgo from '../../shared/components/TimeAgo';
import styles from './CommentItem.module.css';
import CommentRepliesList from './CommentRepliesList';

function CommentItem(props) {

    const auth = useContext(AuthContext);

    const { id, creator, text, date, replies, likes, likedBy } = props;

    const [liked, setLiked] = useState(likedBy.includes(auth.userId));
    const [error, setError] = useState(null);
    const [likesNum, setLikesNum] = useState(likes);
    const [reply, setReply] = useState(`@${creator.name}: `);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [commentReplies, setCommentReplies] = useState([]);
    const [showCommentReplies, setShowCommentReplies] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const onSetShowCommentReplies = event => {
        setShowCommentReplies(prev => !prev);
    }

    const onShowReplyFrom = (event) => {
        setShowReplyForm(prev => !prev);
    }

    const onReplyInput = (event) => {
        setReply(event.target.value);
    }

    const svgClickHandler = async (event) => {
        console.log('svg clicked')
        event.preventDefault();
        if (!liked) {
            try {
                let response = await fetch(`http://localhost:5000/api/comments/like/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                    body: JSON.stringify({
                        userId: auth.userId
                    })
                });
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData);
                setLiked(true);
                setLikesNum(prev => prev + 1);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
        } else {
            try {
                let response = await fetch(`http://localhost:5000/api/comments/unlike/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                    body: JSON.stringify({
                        userId: auth.userId
                    })
                });
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData);
                setLiked(false);
                setLikesNum(prev => prev - 1);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
        }

    }

    const replyButtonHandler = async (event) => {
        console.log(reply);
        event.preventDefault();
        if (reply.trim().length === 0) {
            setError('Comment can not be null.');
        };
        try {
            setIsloading(true);
            let response = await fetch(`http://localhost:5000/api/comments/reply/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    text: reply.trim(),
                    creator: auth.userId
                })
            });
            let responseData = await response.json();
            setIsloading(false);
            if (!response.ok) {
                throw new Error(responseData.message);
            };
            console.log(responseData)
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
        setIsloading(false);
    }

    return (
        <Fragment>
            <hr />
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
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
                    <svg className={`${styles.clickable_likes} ${liked && styles.liked} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={svgClickHandler}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <div>
                        <p>{likesNum}</p>
                    </div>
                </div>
            </div>

            <div className={`${styles.time_location_svg}`}>
                <p>{date && <TimeAgo date={new Date(date)} />} <i> @{creator.address.split(',').slice(-2).join(', ')}</i></p>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={onShowReplyFrom} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                </div>
            </div>

            {/* Check is replies is empty */}
            {
                showReplyForm &&
                <div>
                    <p className={`${styles.reply_p}`}>
                        <input type={'text'} placeholder='reply...' value={reply} onChange={onReplyInput} />
                        <button onClick={replyButtonHandler} type='button'>Send</button>
                    </p>
                </div>
            }

            {replies.length > 0 && <button onClick={onSetShowCommentReplies} className={`${styles.view_replies}`} type='button'>{`${showCommentReplies ? 'Hide' : 'View'} ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`}</button>}

            {showCommentReplies && <CommentRepliesList commentId={props.id} />}


        </Fragment >

    )
}

export default React.memo(CommentItem);