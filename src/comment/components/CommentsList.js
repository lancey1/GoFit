import React from 'react';
import CommentItem from './CommentItem';
import styles from './CommentsList.module.css';

function CommentsList(props) {

    const comments = props.comments;

    console.log(comments)

    let commentList = comments.map(ele => {
        return <CommentItem key={ele.id} id={ele.id} creator={ele.creator} text={ele.text} date={ele.date} replies={ele.replies} likes={ele.likes} likedBy={ele.likedBy} />
    })

    return (
        <div>

            {commentList}
        </div>
    )
}

export default React.memo(CommentsList)