import React from 'react'

import styles from './Notification.module.css';

function Notification(props) {

    const { user } = props

    return (
        <React.Fragment>
            <p>Unread comments</p>
            <div className={`${styles.pending_user_count}`} >
                <i >{user.unreadNotifications}</i>
            </div>
        </React.Fragment>
    )
}

export default Notification