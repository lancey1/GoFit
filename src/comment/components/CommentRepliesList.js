import React, { useEffect, useState } from 'react'
import ErrorModal from '../../shared/components/ErrorModal';
import CommentsList from './CommentsList';
import styles from './CommentRepliesList.module.css';

function CommentRepliesList(props) {

    const commentId = props.commentId;

    const [replies, setReplies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [fetchComments, setFetchComments] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsloading(true);
                let response = await fetch(`http://localhost:5000/api/comments/reply/${commentId}`);
                let responseData = await response.json();
                setIsloading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData)
                setReplies(responseData.comments);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
            setIsloading(false);
        })();
    }, [fetchComments])

    return (
        <div className={`${styles.replies_list}`}>
            {!isLoading &&
                <div div >
                    {error && <ErrorModal error={error} onClear={() => setError(null)} />}
                    <CommentsList comments={replies} />
                </div>
            }
            {isLoading && <h1>Loading</h1>}
        </div >
    )
}

export default CommentRepliesList