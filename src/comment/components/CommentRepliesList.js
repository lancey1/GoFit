import React, { useEffect, useState } from 'react'
import ErrorModal from '../../shared/components/ErrorModal';
import CommentsList from './CommentsList';
import styles from './CommentRepliesList.module.css';

function CommentRepliesList(props) {

    const commentId = props.commentId;

    const [replies, setReplies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsloading(true);
                let response = await fetch(process.env.REACT_APP_BACKEND + `/comments/reply/${commentId}`);
                let responseData = await response.json();
                setIsloading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setReplies(responseData.comments);
            } catch (error) {
                setError(error.message);
            }
            setIsloading(false);
        })();
    }, [])

    return (
        <div className={`${styles.replies_list}`}>
            {(replies && !isLoading) &&
                <div >
                    {error && <ErrorModal error={error} onClear={() => setError(null)} />}
                    <CommentsList comments={replies} />
                </div>
            }
        </div >
    )
}

export default CommentRepliesList