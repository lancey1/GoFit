//* Display All posts

import React, { Fragment, useEffect, useState } from "react";
import PostList from '../../post/components/PostList';
import styles from './Home.module.css';
import MainPageContainer from "../UI/MainPageContainer";
import ErrorModal from "../components/ErrorModal";

function Home(props) {

    const { posts } = props;

    const [followingSelected, setFollowingSelected] = useState(false);
    const [exploreSelected, setExploreSelected] = useState(true);
    const [nearbySelected, setNearbySelected] = useState(false);

    const clickFollowingHandler = () => {
        setFollowingSelected(true);
        setExploreSelected(false);
        setNearbySelected(false);
        console.log('Following');
    };

    const clickExploreHandler = () => {
        setFollowingSelected(false);
        setExploreSelected(true);
        setNearbySelected(false);
        console.log('Explore');
    };

    const clickNearbyHandler = () => {
        setFollowingSelected(false);
        setExploreSelected(false);
        setNearbySelected(true);
        console.log('Nearby');
    };

    return (

        <MainPageContainer>

            <ul className={`${styles.ul}`}>
                <li className={`${styles.li}`} onClick={clickFollowingHandler}>Following</li>
                <li className={`${styles.li}`} onClick={clickExploreHandler}>Explore</li>
                <li className={`${styles.li}`} onClick={clickNearbyHandler}>NearBy</li>
            </ul>

            <PostList posts={posts} />

        </MainPageContainer>

    )
};

export default Home;