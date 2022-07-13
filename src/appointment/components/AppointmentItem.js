import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './AppointmentItem.module.css'

function AppointmentItem(props) {
    // <AppointmentItem key={ele.id} title={ele.title} description={ele.description} address={ele.address} location={ele.location} avatar={ele.creator.image} sender={ele.creator.name} />

    const history = useHistory();
    const auth = useContext(AuthContext);
    const { id, title, description, avatar, address, reciever, appointmentDate, location, pending, recieverAccepted, recieverRejected } = props;
    {/* <Route path="/:userId/appointment/:appointmentId" exact></Route> */ }

    const btnClickHandler = (event) => {
        event.stopPropagation();
        history.push(`/${auth.userId}/appointment/${id}`)
    }


    return (
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
                {recieverAccepted && <p>Accepted</p>}
                {recieverRejected && <p>Rejected</p>}

            </div>

            <button onClick={btnClickHandler} className={`${styles.btn}`}>View</button>


        </article>
    )
}

export default AppointmentItem