import React from 'react'
import BackDrop from './BackDrop'
import styles from './Success.module.css';

function Success(props) {

    const onClickHandler = (event) => {
        event.stopPropagation();
        props.onOk();
    }

    return (
        <BackDrop onClear={props.onClear}>
            <div className={`${styles.div}`}>
                <p>{props.text}</p>
                <button onClick={onClickHandler}>{props.nextAction}</button>
            </div>

        </BackDrop>

    )
}

export default Success