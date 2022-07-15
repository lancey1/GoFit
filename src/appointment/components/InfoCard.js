import React, { useCallback, useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import BackDrop from '../../shared/components/BackDrop';
import ErrorModal from '../../shared/components/ErrorModal';
import Success from '../../shared/components/Success';
import FollowersList from './FollowersList';
import styles from './InfoCard.module.css';

function InfoCard(props) {

    const history = useHistory();
    const auth = useContext(AuthContext);

    const { user } = props;

    console.log(user);
    const [showFollowers, setShowFollowers] = useState(false);
    const [receiver, setReceiver] = useState();
    const [receiverName, setReceiverName] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const titleInputHandler = (event) => {
        setTitle(event.target.value);
    }

    const descriptionInputHandler = (event) => {
        setDescription(event.target.value);
    }

    const addressInputHandler = (event) => {
        setAddress(event.target.value);
    }

    const pickDateHandler = (event) => {
        setDate(event.target.value);
    }

    const onHideHandler = useCallback(() => {
        setShowFollowers(prev => !prev)
    }, []);

    const onSelectHandler = useCallback((userId, userName) => {
        setReceiver(userId);
        setReceiverName(userName);
        setShowFollowers(false);
        console.log(userId, userName);
    }, [])

    const okHandler = (event) => {
        return history.push(`/${user.id}/sent`);
    }

    const onSubmitHandler = async (event) => {

        if (!auth || !auth.isLoggedIn) {
            return setError('Login first');
        }

        console.log(title, description, address, date, receiver, user.id);
        if (title.trim().length === 0 || description.trim().length === 0 || address.trim().length === 0 || !date) {
            return setError('Please check your inputs');
        }

        // if (Date.now() > new Date(date)) {
        //     return setError('Date is not valid.');
        // }

        try {
            const response = await fetch('http://localhost:5000/api/appointments/', {
                method: 'POST',
                body: JSON.stringify({
                    reciever: receiver,
                    creator: user.id,
                    title: title,
                    description: description,
                    address: address,
                    appointmentDate: date,
                }),
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            console.log(responseData);
            setSuccess(true);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }


    return (

        <article className={`${styles.card}`}>

            {success &&
                (
                    <BackDrop onClear={() => { setSuccess(false) }}>
                        <Success text='Invitation Requested' onOk={okHandler} nextAction='Go To Appointments' info='Your appointment is successfully requested!'/>
                    </BackDrop>
                )
            }
            {/* //! need to style Success.js as well, this line below is only for css purpose, after styling Success.js, you can delete it */}
            {/* <Success text='Appointment Created' onOk={okHandler} onClear={() => { setSuccess(false) }} onClick={event => event.stopPropagation()} nextAction='Go to profile'/> */}

            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            <img className={styles.inviteIcon} src="https://cdn-icons-png.flaticon.com/512/980/980240.png" />
            <h1 className={styles.inviteRequestText}>Send Invitation</h1>
            <button className={styles.to} onClick={onHideHandler}>{receiverName ? `To: ${receiverName}` : `Invite Friend`}</button>

            {showFollowers && (
                <BackDrop onClear={() => { setShowFollowers(false) }}>
                    <FollowersList onSelect={onSelectHandler} onSubmit={onHideHandler} />
                </BackDrop>
            )}
    
            <input className={styles.inviteText} type={'text'} placeholder='Subject' onChange={titleInputHandler} />
            <textarea className={styles.inviteText} placeholder='Request Message' onChange={descriptionInputHandler} />
            <input className={styles.inviteText} type={'date'} onChange={pickDateHandler} />
            <input className={styles.inviteText} type={'text'} placeholder='Meetup Location' onChange={addressInputHandler} />
        
            {/* <p className={styles.from}>From: {user && `${user.name}`}</p> */}

            <button className={styles.inviteSend_btn} onClick={onSubmitHandler}>Send</button>

        </article>

    )
}

export default React.memo(InfoCard);