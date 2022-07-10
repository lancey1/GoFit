import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Content from "../components/Content";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../../context/AuthContext";

const Profile = props => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        (async () => {

            try {
                let response = await fetch(`http://localhost:5000/api/user/${userId}`);
                let responseData = await response.json();
                console.log(responseData)
                if (!response.ok) {
                    console.log(response);
                    throw new Error(responseData.message);
                };
                setUser(responseData.user);
                setPosts(responseData.posts);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
        })();
    }, [userId]);

    return (
        <div>
            
            {user && <p>{user.name}</p>}
            {user && <p>{posts.length}</p>}

            {error && <ErrorModal error={error} onClear={() => setError(null)} />}

            <UserInfo userId={userId} />
            <hr></hr>

            <Content />

        </div>

    )
}

export default Profile;