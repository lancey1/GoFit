import React, { useEffect, useState } from 'react'
import AppointmentItem from './AppointmentItem';
import styles from './AppointmentsList.module.css';

function AppointmentsList(props) {

    const { userId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState(null);

    //* fetch all appointments by user id
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/appointments/${userId}`);
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                console.log(responseData)
                setAppointments(responseData.appointments);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        })();
    }, [])

    return (
        <div>
            AppointmentsList
            {(appointments && !isLoading) && appointments.map(ele => (
                <AppointmentItem key={ele.id} id={ele.id} title={ele.title} description={ele.description}
                    address={ele.address} location={ele.location} avatar={ele.reciever.image} reciever={ele.reciever.name}
                    appointmentDate={ele.appointmentDate} pending={ele.pending} recieverAccepted={ele.recieverAccepted} recieverRejected={ele.recieverRejected} />
            ))}

        </div>
    )
}

export default AppointmentsList