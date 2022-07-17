import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import InfoCard from '../components/InfoCard';
import styles from './NewAppointment.module.css';

function NewAppointment(props) {

    const auth = useContext(AuthContext);
    const history = useHistory();

    if (!auth.userId) {
        return history.replace('/login');
    }

    return (

        <section className={`${styles.section}`}>
            <InfoCard user={props.user} />
        </section>
    )
}

export default React.memo(NewAppointment);