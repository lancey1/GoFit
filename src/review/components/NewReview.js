import React from 'react'
import styles from './NewReview.module.css'
import ReviewForm from './ReviewForm'

function NewReview(props) {

    const { appointmentId, reviewRecieverId,onRefresh } = props;

    return (
        <section className={`${styles.container}`} onClick={event => event.stopPropagation()}>
            <ReviewForm appointmentId={appointmentId} reviewRecieverId={reviewRecieverId} all onRefresh={onRefresh}/>
        </section>

    )
}

export default NewReview