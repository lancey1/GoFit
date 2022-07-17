import { Backdrop } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import CommentsList from './CommentsList';
import styles from './UnreadComments.module.css';

function UnreadComments(props) {

    const auth = useContext(AuthContext);

    const { userId, onChangeShowUnread, onChange } = props;
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    const onClose = async (event) => {
        event.stopPropagation();
        onChangeShowUnread();
    }

    const onClear = async (event) => {
        event.stopPropagation();
        try {
            let response = await fetch(process.env.REACT_APP_BACKEND + `/comments/reset-unread-comments/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            });
            let responseData = await response.json();
            console.log(responseData)
            if (!response.ok) {
                console.log(response);
                throw new Error(responseData.message);
            };
            onChangeShowUnread();
            onChange();
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(process.env.REACT_APP_BACKEND + `/comments/unread/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                });
                let responseData = await response.json();
                console.log(responseData)
                if (!response.ok) {
                    console.log(response);
                    throw new Error(responseData.message);
                };
                setComments(responseData.comments);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
        })();
    }, [])

    return (

        <section className={`${styles.container}`} >
            <div >
                <div className={`${styles.svg_div}`} onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.svg} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <p className={`${styles.title}`} >Unread Comments</p>
                {error && <ErrorModal error={error} onClear={() => setError(null)} />}
                <CommentsList comments={comments} />
                <hr></hr>
            </div>
            <div>
                <p className={`${styles.close}`} onClick={onClear} >Clear</p>
            </div>

        </section>

    )
}

export default UnreadComments