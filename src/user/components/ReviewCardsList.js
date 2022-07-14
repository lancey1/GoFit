import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard';

function ReviewCardsList(props) {

    const { onChange, userId } = props;

    const [reviews, setReviews] = useState();


    return (
        <div>
            {reviews.map(ele => (
                <ReviewCard key={ele.id}/>
            ))
            }
        </div>
    )
}

export default ReviewCardsList