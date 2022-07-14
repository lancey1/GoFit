import React, { useEffect } from 'react'
import ReviewItem from './ReviewItem'

function ReviewsList(props) {

    const { appointmentId, reviews } = props;

    return (
        <div>
            <h1>{appointmentId}</h1>
            {reviews.map(ele => (
                <ReviewItem key={ele.id} review={ele} />
            ))}
        </div>
    )
}

export default ReviewsList