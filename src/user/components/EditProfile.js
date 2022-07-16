import React, { useContext, useState } from 'react'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './EditProfile.module.css';

function EditProfile(props) {

    const auth = useContext(AuthContext);
    const history = useHistory();

    const [name, setName] = useState(props.user.name);
    const [bio, setBio] = useState(props.user.bio);
    const [gender, setGender] = useState(props.user.gender);
    const [age, setAge] = useState(props.user.age);
    const [gymMembership, setGymMembership] = useState(props.user.gymMembership);
    const [athleteTypes, setAthleteTypes] = useState(props.user.athleteTypes);
    const [address, setAddress] = useState(props.user.address);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    console.log(auth)

    let gymMembershipPlaceHolder;

    if (gymMembership.length === 0) {
        gymMembershipPlaceHolder = 'No gym membership'
    } else {
        gymMembershipPlaceHolder = gymMembership.join(', ');
    }

    let athleteTypesPlaceHolder;
    if (athleteTypes.length === 0) {
        athleteTypesPlaceHolder = 'unknown';
    } else {
        athleteTypesPlaceHolder = athleteTypes.join(', ')
    }

    const nameChangeHandler = event => {
        setName(event.target.value);
    }

    const bioChangeHandler = event => {
        setBio(event.target.value);
    }

    const genderChangeHandler = event => {
        setGender(event.target.value);
    }

    const ageChangeHandler = event => {
        setAge(event.target.value);
    }

    const addressChangeHandler = event => {
        setAddress(event.target.value);
    }

    const gymChangeHandler = event => {
        let gymMembershipArr;
        if (gymMembershipRef.current.value) {
            gymMembershipArr = gymMembershipRef.current.value.split(',').map(item => item.trim());
        } else {
            gymMembershipArr = [];
        };
        setGymMembership(gymMembershipArr);
    }

    const athleteTypesChangeHandler = event => {
        let athleteTypesArr;
        if (athleteTypesRef.current.value) {
            athleteTypesArr = athleteTypesRef.current.value.split(',').map(item => item.trim());
        } else {
            athleteTypesArr = [];
        };
        setAthleteTypes(athleteTypesArr);
    }

    const gymMembershipRef = useRef();
    const athleteTypesRef = useRef();



    const formSubmitHandler = async event => {
        event.preventDefault();

        let gymMembershipArr;
        if (gymMembershipRef.current.value) {
            gymMembershipArr = gymMembershipRef.current.value.split(',').map(item => item.trim());
        } else {
            gymMembershipArr = [];
        };

        let athleteTypesArr;
        if (athleteTypesRef.current.value) {
            athleteTypesArr = athleteTypesRef.current.value.split(',').map(item => item.trim());
        } else {
            athleteTypesArr = [];
        };

        console.log(gymMembershipArr);
        console.log(athleteTypesArr);

        if (!name || !address) {
            setError('Name or address invalid.');
        };

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/user/${props.user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    name: name,
                    bio: bio,
                    age: age,
                    gender: gender,
                    gymMembership: gymMembership,
                    athleteTypes: athleteTypes,
                    address: address
                })
            });
            let responseData = await response.json();
            setIsLoading(false);
            if (!response.ok) {
                throw new Error(responseData.message);
            };
            props.onBackToProfile();
            auth.logout()
            auth.login(
                responseData.user.id,
                responseData.token,
                responseData.user
            );
        } catch (error) {
            console.log(error);
            setError(error.message || 'Unexpected error occured.');
        };
        setIsLoading(false);

    }

    return (
        <div className={`${styles.container}`}>

            {error && <ErrorModal error={error} onClear={() => { setError(null) }} />}

            <div className={`${styles.svg}`} onClick={props.onBackToProfile}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <form onSubmit={formSubmitHandler} className={`${styles.form}`}>

                <img className={`${styles.image}`} src={props.user.image} />

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='text' value={name} onChange={nameChangeHandler} />
                    <label>Name</label>
                </div>

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='textarea' value={bio} onChange={bioChangeHandler} />
                    <label>Bio</label>
                </div>

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='text' value={gender} onChange={genderChangeHandler} />
                    <label>Gender</label>
                </div>

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='number' value={age} onChange={ageChangeHandler} />
                    <label>Age</label>
                </div>

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='text' value={gymMembership.join(',')} onChange={gymChangeHandler} ref={gymMembershipRef} />
                    <label>Gym Membership (separate by comma)</label>
                </div>

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='text' value={athleteTypes.join(',')} onChange={athleteTypesChangeHandler} ref={athleteTypesRef} />
                    <label>Prefered Activity (separate by comma)</label>
                </div>

                <div className={`${styles.input_label}`}>
                    <input className={`${styles.text_input}`} type='text' value={address} onChange={addressChangeHandler} />
                    <label>Address</label>
                </div>
                <div className={`${styles.container_btn}`}>
                    <button className={`${styles.backtoprofile_btn}`} onClick={props.onBackToProfile}>Back to Profile</button>
                    <button className={`${styles.editsubmit_btn}`}>Submit</button>
                </div>
            </form>



        </div>
    )
}

export default EditProfile