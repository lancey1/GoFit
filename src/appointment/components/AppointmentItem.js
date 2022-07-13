import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NewReview from '../../review/components/NewReview';
import BackDrop from '../../shared/components/BackDrop';
import styles from './AppointmentItem.module.css'

function AppointmentItem(props) {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const { id, title, description, avatar, address, reciever, appointmentDate, location, pending, recieverAccepted, recieverRejected } = props;
    const [showReview, setShowReview] = useState(false);

    const btnClickHandler = (event) => {
        event.stopPropagation();
        history.push(`/${auth.userId}/appointment/${id}`)
    }

    const hideShowReview = event => {
        event.stopPropagation();
        setShowReview(false);
    }

    const reviewBtnClickHandler = event => {
        event.stopPropagation();
        console.log('Now open review page');
        setShowReview(true);
    }
    const appointmentFinished = ((new Date(appointmentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) < 0);

    return (

        <React.Fragment>

            {showReview && (
                <BackDrop onClear={hideShowReview}>
                    <NewReview />
                </BackDrop>
            )}

            <article className={`${styles.article}`} >

                <div className={`${styles.user}`} >
                    <div className={`${styles.user_img_name_follow}`}>
                        <img className={`${styles.avatar}`} src={avatar} alt="" />
                        <div className={`${styles.name_follow}`}>
                            <h4>{`${reciever}`}</h4>
                        </div>
                    </div>
                    <div className={`${styles.info}`}>
                        <h3>{`Title: ${title}`}</h3>
                        <p>{new Date(appointmentDate).toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                </div>

                <div className={`${styles.status}`}>
                    {pending && <p>Pending</p>}
                    {(recieverAccepted && !appointmentFinished) && <p>Accepted</p>}
                    {recieverRejected && <p>Rejected</p>}
                </div>

                {(appointmentFinished && recieverAccepted) &&
                    <button onClick={reviewBtnClickHandler} className={`${styles.btn}`}>Review</button>
                }
                <button onClick={btnClickHandler} className={`${styles.btn}`}>Details</button>


            </article>

        </React.Fragment>
    )
}

export default AppointmentItem