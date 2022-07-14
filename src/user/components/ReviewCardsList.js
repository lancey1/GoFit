import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import ReviewCard from './ReviewCard';
import styles from './ReviewCardsList.module.css'

function ReviewCardsList(props) {

    const auth = useContext(AuthContext);

    const { onChange, reviews } = props;

    return (
        <div onClick={event => event.stopPropagation()} className={`${styles.container}`}>
            {reviews && reviews.map(ele => (
                <ReviewCard key={ele.id} avatar={ele.creator.image} date={ele.date} rating={ele.rating} text={ele.text} />
            ))
            }
            <div className={`${styles.btn_div}`}>
                <button onClick={onChange} className={`${styles.btn}`}>{'Back'}</button>
            </div>

        </div>
    )
}

export default React.memo(ReviewCardsList);