import React from 'react'
import styles from './DarkerBackDrop.module.css';

function DarkerBackDrop(props) {
    return (
        <div className={`${styles.backdrop}`} onClick={props.onClear}>
            {props.children}
        </div >
    )
}

export default DarkerBackDrop