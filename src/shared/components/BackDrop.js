import React from 'react'
import styles from './BackDrop.module.css';

function BackDrop(props) {
    return (
        <div className={`${styles.backdrop}`} onClick={props.onClear}>
            {props.children}
        </div >
    )
}

export default BackDrop