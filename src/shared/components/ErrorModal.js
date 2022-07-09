import React from 'react';
import BackDrop from './BackDrop';
import styles from './ErrorModal.module.css';

function ErrorModal(props) {
    return (
        <BackDrop onClear={props.onClear}>
            <section className={`${styles.card}`}>
                <p>
                    {props.error}
                </p>
                <div>
                    <button onClick={props.onClear}>Ok</button>
                </div>

            </section>
        </BackDrop>
    )
}

export default ErrorModal