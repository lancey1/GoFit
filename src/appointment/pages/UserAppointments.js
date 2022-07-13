import React from 'react'
import { useParams } from 'react-router-dom';
import AppointmentsList from '../components/AppointmentsList';
import styles from './UserAppointments.module.css';

function UserAppointments(props) {

    const { userId } = useParams();
    console.log(userId)

    return (
        <div className={`${styles.section}`}>
            <h1>All</h1>
            <AppointmentsList userId={userId} />
        </div>
    )
}

export default UserAppointments