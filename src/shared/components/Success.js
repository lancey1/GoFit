import React from 'react'
import BackDrop from './BackDrop'
import styles from './Success.module.css';

function Success(props) {

    const onClickHandler = (event) => {
        event.stopPropagation();
        props.onOk();
    }

    return (

        <div className={`${styles.div}`} onClick={event => event.stopPropagation()}>
            <p>{props.text}</p>
            <button onClick={onClickHandler}>{props.nextAction}</button>
        </div>


    )
}

export default Success