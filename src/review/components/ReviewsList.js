import React, { useEffect } from 'react'
import ReviewItem from './ReviewItem'
import styles from './ReviewsList.module.css'

function ReviewsList(props) {

    const {  reviews } = props;



    return (

        <div className={`${styles.container}`}>
            <h1>{'Feedback'}</h1>
            {reviews.map(ele => (
                <ReviewItem key={ele.id} review={ele} />
            ))}
        </div>

    )
}

export default ReviewsList