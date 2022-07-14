import React from 'react'
import styles from './ReviewItem.module.css'

function ReviewItem(props) {

    const { review } = props;
    console.log(review);
    return (
        <div className={`${styles.card}`}>
            <div>
                <img className={`${styles.avatar}`} src={review.creator.image} alt="avatar" />
            </div>
        </div>
    )
}

export default ReviewItem