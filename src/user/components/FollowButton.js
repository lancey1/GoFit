import React, { useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from '../../post/components/FollowUserButton.module.css';

function FollowButton(props) {
    const auth = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [data, setData] = useState(auth.user);
    const user = props.user;
    const [isFollowing, setIsFollowing] = useState(auth.user.follows.includes(user));
    const [isSelf, setIsSelf] = useState(auth.userId === user);
    // console.log({data})
    // console.log("this is auth " + auth.userId)
    // console.log(auth.user.follows.includes(user))
    // console.log({user})
    //! user.followers.includes(auth.userId)


    const changeFollowStatus = async (event) => {
        event.preventDefault();
        if (!auth || !auth.user) {
            return setError('Please Login first!');
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
                data.follows.push(user);
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
                setData(data.follows.includes(`${user}`) && data.follows.splice(data.follows.indexOf(`${user}`), 1));
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