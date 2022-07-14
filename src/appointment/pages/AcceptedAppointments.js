import React from 'react'
import { useParams } from 'react-router-dom';
import AcceptedAppointmentsList from '../components/AcceptedAppointmentsList';
import styles from './AcceptedAppointments.module.css';


function AcceptedAppointments(props) {
    const { userId } = useParams();
    
    return (
        <div className={`${styles.section}`}>
            <h1>Invitations <i className={`${'fas fa-angle-right'} ${styles.right}`}></i> Accepted</h1>
            <AcceptedAppointmentsList userId={userId} />
        </div>
    )
}

export default AcceptedAppointments