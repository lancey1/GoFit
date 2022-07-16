//* Display All posts

import React, { Fragment, useEffect, useState } from "react";
import PostList from '../../post/components/PostList';
import styles from './Home.module.css';
import MainPageContainer from "../UI/MainPageContainer";
import ErrorModal from "../components/ErrorModal";
import './SearchBar.css';

function Home(props) {

    console.log('in home');
    const { userId } = props;

    const [followingSelected, setFollowingSelected] = useState(false);
    const [exploreSelected, setExploreSelected] = useState(true);
    const [nearbySelected, setNearbySelected] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null);

    const [tag, setTag] = useState(null);

    const tagInputHandler = event => {
        setTag((event.target.value).toUpperCase());
    };

    const tagInputSubmitHandler = async event => {
        event.preventDefault();
        if (!tag || tag.trim().length === 0) return

        try {
            const response = await fetch(`http://localhost:5000/api/posts/tags/${tag.trim()}`);
            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                throw new Error(responseData.error);
            };
            setPosts(responseData.posts);
        } catch (error) {
            setError(error.message);
        }
    }

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

            <form class="searchBox" onSubmit={tagInputSubmitHandler}>
                <input class="searchInput" type="text" name="" placeholder="Search" onChange={tagInputHandler} value={tag} />
                <button class="searchButton" >
                    <i class="material-icons">
                        search
                    </i>
                </button>
            </form>

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