import React, { useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from '../../post/components/FollowUserButton.module.css';

function FollowButton(props) {

    const auth = useContext(AuthContext);
    const [error, setError] = useState(null);
    const user = props.user;
    //auth.userId.followers.includes(user)
    const [isFollowing, setIsFollowing] = useState();
    const [isSelf, setIsSelf] = useState(auth.userId == user.id);
    console.log(auth.user)
    console.log(auth.user.follows.includes(user))
    console.log(user)



    const changeFollowStatus = async (event) => {
        event.preventDefault();
        if (!auth || !auth.user) {
            return setError('Login first');
        }

        if (isSelf) {
            return;
        }

        if (!isFollowing) {
            try {
                let response = await fetch(`http://localhost:5000/api/user/follow/${user}`, {
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
                setIsFollowing(true);
            } catch (error) {
                console.log(error)
            };
        }
        if (isFollowing) {
            try {
                let response = await fetch(`http://localhost:5000/api/user/unfollow/${user}`, {
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

export default FollowButton