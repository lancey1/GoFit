import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './FollowUserButton.module.css';

function FollowUserButton(props) {

    const auth = useContext(AuthContext);

    const [error, setError] = useState(null);

    const creator = props.post.creator;

    const [isFollowing, setIsFollowing] = useState(creator.followers.includes(auth.userId));
    const [isSelf, setIsSelf] = useState(auth.userId == creator.id);



    const changeFollowStatus = async (event) => {
        event.preventDefault();
        if (!auth || !auth.isLoggedIn) {
            return setError('Please Login first!');
        }
        
        if (isSelf) {
            return;
        }

        if (!isFollowing) {
            try {
                let response = await fetch(process.env.REACT_APP_BACKEND + `/user/follow/${creator.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                    body: JSON.stringify(
                        {
                            creator: auth.userId
                        }
                    )
                });
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setIsFollowing(true);
            } catch (error) {
                console.log(error)
            };
        }
        if (isFollowing) {
            try {
                let response = await fetch(process.env.REACT_APP_BACKEND + `/user/unfollow/${creator.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    },
                    body: JSON.stringify(
                        {
                            creator: auth.userId
                        }
                    )
                });
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData)
                setIsFollowing(false);
            } catch (error) {
                console.log(error)
            };
        }

    }


    return (
        <>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            {!isSelf && <button className={`${styles.follow_btn} ${isFollowing && styles.following}`} onClick={changeFollowStatus}>{isFollowing ? 'Unfollow' : 'Follow'}</button>}

        </>

    )
}

export default FollowUserButton