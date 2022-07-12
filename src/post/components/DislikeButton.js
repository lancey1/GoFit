import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import styles from './DislikeButton.module.css'

function DislikeButton(props) {

    const post = props.post;

    const auth = useContext(AuthContext);

    const [disliked, setDisliked] = useState(false);

    // router.patch('/dislike/:pid', dislikePost);
    const dislikePostHandler = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch(`http://localhost:5000/api/posts/dislike/${post.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + auth.token,
                }
            });
            let responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            };
            console.log(responseData)
            setDisliked(true);
        } catch (error) {
            console.log(error)
        };
    }


    return (
        <button className={`${styles.dislike_btn} ${disliked && styles.disliked}`} disabled={disliked} onClick={dislikePostHandler} > {disliked ? "Disliked" : "Dislike"}</button >
    )
}

export default DislikeButton