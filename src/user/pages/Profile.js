import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Content from "../components/Content";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../../context/AuthContext";
import styles from './Profile.module.css';
import EditProfile from "../components/EditProfile";
import ChangeBackground from "../components/ChangeBackground";
import ChangeImage from "../components/ChangeImage";

const Profile = props => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [showEditPage, setShowEditPage] = useState(false);

    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [collections, setCollections] = useState([]);

    const params = useParams();
    const { userId } = params;

    const showEditPageHandler = () => {
        setShowEditPage(true);
        console.log('set')
    }

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(process.env.REACT_APP_BACKEND + `/user/${userId}`);
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setUser(responseData.user);
                setPosts(responseData.user.posts);
                setLikedPosts(responseData.user.likedPosts);
                setCollections(responseData.user.collections);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
        })();
    }, [userId, showEditPage]);

    return (
        <div>

            {error && <ErrorModal error={error} onClear={() => setError(null)} />}

            {(!showEditPage && user) &&
                <div>
                    <UserInfo user={user} onShowEditPage={showEditPageHandler} />
                    <Content posts={posts} likedPosts={likedPosts} collections={collections} userId={userId} />
                </div>
            }

            {showEditPage && <EditProfile user={user} onBackToProfile={() => setShowEditPage(false)} />}

        </div>

    )
}

export default Profile;