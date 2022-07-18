import React from 'react'
import { useParams } from 'react-router-dom';
import AppointmentsList from '../components/AppointmentsList';
import styles from './UserAppointments.module.css';

function UserAppointments(props) {

    const { userId } = useParams();

    return (
        <div className={`${styles.section}`}>
            <h1>Invitations <i className={`${'fas fa-angle-right'} ${styles.right}`}></i> All</h1>
            <AppointmentsList userId={userId} />
        </div>
    )
}

export default UserAppointments