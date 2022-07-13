import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './Appointment.module.css'
import Map from '../../shared/UI/Map';

function Appointment(props) {
    const { appointmentId } = useParams();
    const auth = useContext(AuthContext);

    const history = useHistory();
    const [appointment, setAppointment] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const acceptBtnHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/appointments/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    userId: auth.userId,
                    appointmentId: appointmentId
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            history.replace(`/${auth.userId}/appointments`);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    const rejectBtnHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/appointments/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    userId: auth.userId,
                    appointmentId: appointmentId
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setAppointment(responseData.appointment);
            history.replace(`/${appointment.reciever}/appointments`);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/appointments/appointment/${appointmentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setAppointment(responseData.appointment);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        })();
    }, [])

    return (
        <React.Fragment>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            {(appointment && !isLoading) &&
                <article className={`${styles.article}`} >

                    <div>
                        <div>
                            <img className={`${styles.avatar}`} src={appointment.reciever.image} alt="avatar" />
                            <div>
                                <h3>{`From: ${appointment.reciever.name}`}</h3>
                            </div>
                        </div>
                        <div className={`${styles.info}`}>
                            <h3>{`Title: ${appointment.title}`}</h3>
                            <p>{`Text: ${appointment.description}`}</p>
                            <div className={`${styles.map}`}>
                                <Map center={appointment.location} zoom={12} />
                            </div>
                            <p>{`Address: ${appointment.address}`}</p>

                            <p>{new Date(appointment.appointmentDate).toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

                            {(appointment.reciever.id === auth.userId) &&
                                <div>
                                    <button onClick={rejectBtnHandler}>{`Reject`}</button>
                                    <button onClick={acceptBtnHandler}>{`Accept`}</button>
                                </div>
                            }

                        </div>
                    </div>
                </article>
            }
        </React.Fragment>
    )
}

export default Appointment

// let response = await fetch(`http://localhost:5000/api/comments/unread/${userId}`, {
//    