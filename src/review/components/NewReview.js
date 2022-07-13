import React from 'react'
import styles from './NewReview.module.css'

function NewReview(props) {
    return (
        <section className={`${styles.container}`} onClick={event=>event.stopPropagation()}>
            <div>NewReview</div>
        </section>

    )
}

export default NewReview