import React, { useEffect, useState } from 'react'
import AppointmentItem from './AppointmentItem';
import styles from './InvitationsList.module.css';

function InvitationsList(props) {

    const { userId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState(null);

    //* fetch all appointments by user id
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch(process.env.REACT_APP_BACKEND + `/appointments/invitations/${userId}`);
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setAppointments(responseData.invitations);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        })();
    }, [])

    return (
        <div>
            {(appointments && !isLoading) && appointments.map(ele => (
                <AppointmentItem key={ele.id} id={ele.id} title={ele.title} description={ele.description}
                    address={ele.address} location={ele.location} revieverAvatar={ele.reciever.image} recieverName={ele.reciever.name} creatorName={ele.creator.name} creatorAvatar={ele.creator.image}
                    appointmentDate={ele.appointmentDate} pending={ele.pending} recieverAccepted={ele.recieverAccepted} recieverRejected={ele.recieverRejected} reviews={ele.reviews}/>
            ))}

        </div>
    )
}

export default InvitationsList