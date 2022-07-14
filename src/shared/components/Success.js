import React from 'react'
import BackDrop from './BackDrop'
import styles from './Success.module.css';

function Success(props) {

    const onClickHandler = (event) => {
        event.stopPropagation();
        props.onOk();
    }

    return (

        <div className={styles.div} onClick={event => event.stopPropagation()}>
            <div className={styles.innerContainer}>
                <div>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{props.text}</h2>
                    </div>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.bodyInnerContainer}>
                        <div className={styles.imageContainer}>
                            <img className={styles.successBtn} src="http://assets.stickpng.com/images/5aa78e207603fc558cffbf19.png" />
                        </div>
                        <p><b>Appointment request has been sent.</b></p>
                    </div>
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.gotoapptBtn}>
                        <button onClick={onClickHandler} className={styles.button}>{props.nextAction}</button>
                    </div>
                </div>      
            </div>
        </div>


    )
}

export default Success