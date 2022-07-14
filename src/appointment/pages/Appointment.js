import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './Appointment.module.css'
import Map from '../../shared/UI/Map';
import ReviewsList from '../../review/components/ReviewsList';

function Appointment(props) {
    const { appointmentId } = useParams();
    const auth = useContext(AuthContext);

    const history = useHistory();
    const [appointment, setAppointment] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(auth.userId);

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
            history.push(`/${auth.userId}/accepted`);
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
            history.push(`/user/${auth.userId}`);
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
                            <div>
                            <img className={`${styles.avatar}`} src={appointment.reciever.image} alt="avatar" />
                                <h3>{`Sender: ${appointment.creator.name}`}</h3>
                                {/* <h3>{`Reciever: ${appointment.reciever.name}`}</h3> */}
                            </div>
                        </div>
                        <div className={`${styles.info}`}>
                            <h3>{`Title: ${appointment.title}`}</h3>
                            <hr />
                            <p>{`Message: ${appointment.description}`}</p>
                            <p><b>{`Address: ${appointment.address}`}</b></p>

                            <p><b>{new Date(appointment.appointmentDate).toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</b></p>
                            <div className={`${styles.map}`}>
                                <Map center={appointment.location} zoom={12} />
                            </div>


                            {(appointment.reciever.id === auth.userId && !appointment.recieverAccepted && !appointment.recieverRejected) &&
                                <div>
                                    <button onClick={rejectBtnHandler}>{`Reject`}</button>
                                    <button onClick={acceptBtnHandler}>{`Accept`}</button>
                                </div>
                            }
                        </div>

                        {(appointment.reviews && appointment.reviews.length > 0) &&
                            <ReviewsList reviews={appointment.reviews} />
                        }
                    </div>
                </article>
            }
        </React.Fragment>
    )
}

export default Appointment