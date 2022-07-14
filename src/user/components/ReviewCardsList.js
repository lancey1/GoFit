import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import ReviewCard from './ReviewCard';
import styles from './ReviewCardsList.module.css'

function ReviewCardsList(props) {

    const auth = useContext(AuthContext);

    const { onChange, userId } = props;

    const [error, setError] = useState(null);

    const [reviews, setReviews] = useState();


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/reviews/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                console.log(responseData)
                setReviews(responseData.reviews.filter(ele => ele.creator.id !== userId));
            } catch (error) {
                setError(error.message);
            }
        })();
    }, [])

    return (
        <div onClick={event => event.stopPropagation()} className={`${styles.container}`}>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            {reviews && reviews.map(ele => (
                <ReviewCard key={ele.id} avatar={ele.creator.image} date={ele.date} rating={ele.rating} text={ele.text} />
            ))
            }
            <button onClick={onChange}>{'Back'}</button>
        </div>
    )
}

export default ReviewCardsList