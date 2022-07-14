import React from 'react'
import styles from './Chat.module.css'
import Messenger from '../pages/Messenger'
import BackDrop from '../components/BackDrop'

function Chat(props) {

    return (

        <BackDrop>
            <div className={`${styles.div}`}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={props.onHide} className={`h-6 w-6 ${styles.svg}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <Messenger user={props.user} />
            </div>
        </BackDrop>

    )
}

export default React.memo(Chat)