import React from 'react'
import InfoCard from '../components/InfoCard';
import styles from './NewAppointment.module.css';

function NewAppointment(props) {
    return (
        <section className={`${styles.section}`}>

            <InfoCard user={props.user} />

        </section>
    )
}

export default React.memo(NewAppointment);