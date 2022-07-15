import React from 'react'

import styles from './Notification.module.css';

function Notification(props) {

    const { text, title } = props

    return (
        <React.Fragment>
            <div className={`${styles.pending_user_count}`} >
                <i >{text}</i>
            </div>
            <p className={styles.p}>{` ${title}`}</p>
        </React.Fragment>
    )
}

export default Notification