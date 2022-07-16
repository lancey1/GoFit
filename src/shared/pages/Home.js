//* Display All posts

import React, { Fragment, useEffect, useState } from "react";
import PostList from '../../post/components/PostList';
import styles from './Home.module.css';
import MainPageContainer from "../UI/MainPageContainer";
import ErrorModal from "../components/ErrorModal";

function Home(props) {

    console.log('in home');
    const { userId } = props;

    const [followingSelected, setFollowingSelected] = useState(false);
    const [exploreSelected, setExploreSelected] = useState(true);
    const [nearbySelected, setNearbySelected] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null);

    const clickFollowingHandler = async () => {
        setFollowingSelected(true);
        setExploreSelected(false);
        setNearbySelected(false);
        console.log('Following');
        try {
            const response = await fetch(`http://localhost:5000/api/posts/followings/${userId}`)
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error);
            }
            let posts = [];
            console.log(responseData)
            for (let ele of responseData.user.follows) {
                posts = posts.concat(ele.posts);
            }

            setPosts(posts);
        } catch (error) {
            setError(error.message);
        }
    };

    const clickExploreHandler = () => {
        setFollowingSelected(false);
        setExploreSelected(true);
        setNearbySelected(false);
        console.log('Explore');
        (async () => {
            try {
                // setIsLoading(true);
                let response = await fetch('http://localhost:5000/api/posts');
                let responseData = await response.json();
                // setIsLoading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setPosts(responseData.posts);
            } catch (error) {
                setError(error.message);
            }
            // setIsLoading(false);
        })();
    };

    const clickNearbyHandler = () => {
        setFollowingSelected(false);
        setExploreSelected(false);
        setNearbySelected(true);
        console.log('Nearby');
    };

    useEffect(() => {
        (async () => {
            try {
                // setIsLoading(true);
                let response = await fetch('http://localhost:5000/api/posts');
                let responseData = await response.json();
                // setIsLoading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setPosts(responseData.posts);
            } catch (error) {
                setError(error.message);
            }
            // setIsLoading(false);
        })();
    }, [])

    return (

        <MainPageContainer>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            <ul className={`${styles.ul}`}>
                {userId && <li className={`${styles.li} ${followingSelected && styles.active}`} onClick={clickFollowingHandler}>Following</li>}
                <li className={`${styles.li} ${exploreSelected && styles.active}`} onClick={clickExploreHandler}>Explore</li>
                <li className={`${styles.li} ${nearbySelected && styles.active}`} onClick={clickNearbyHandler}>NearBy</li>
            </ul>

            {posts && <PostList posts={posts} />}


        </MainPageContainer>

    )
};

export default React.memo(Home);