import React, { useEffect } from 'react'
import ReviewItem from './ReviewItem'
import styles from './ReviewsList.module.css'

function ReviewsList(props) {

    const {  reviews } = props;



    return (

        <div className={`${styles.container}`}>
            <h3>{"User's Feedback"}</h3>
            <hr/>
            {reviews.map(ele => (
                <ReviewItem key={ele.id} review={ele} />
            ))}
        </div>

    )
}

export default ReviewsList