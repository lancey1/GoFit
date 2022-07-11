//* Display All posts

import React, { Fragment, useEffect, useState } from "react";
import PostList from '../../post/components/PostList';
import styles from './Home.module.css';
import MainPageContainer from "../UI/MainPageContainer";
import ErrorModal from "../components/ErrorModal";

const postData = [
    {
        id: 0,
        avatar:
            "https://preview.redd.it/3fc3wd5xwf171.png?auto=webp&s=efea2e1ae32067ea07fc547585f64a95171c7902",
        username: "Bob Pants",
        postImage: "https://64.media.tumblr.com/ba2790c2d624366f90d74a508eabcdb1/tumblr_odg7x2R12o1veutmko1_640.jpg",
    },
    {
        id: 1,
        avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcw_wgODsl-3EI-3PoxsDvFYrtiKJQ_QMjSg&usqp=CAU",
        username: "Patrick Star",
        postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWrDx4gffPJw1HuDsNfXJJ1iKcOKyySjNEg&usqp=CAU",
    },
    {
        id: 2,
        avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQva5Ohw3msYE8KHAfRYz2sWatuF3u8rLADEQ&usqp=CAU",
        username: "Sandy Cheeks",
        postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
    },
    {
        id: 3,
        avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQva5Ohw3msYE8KHAfRYz2sWatuF3u8rLADEQ&usqp=CAU",
        username: "Sandy Cheeks",
        postImage: "https://i.imgur.com/rDmfVqIg.jpg",
    },
];

function Home() {

    const [followingSelected, setFollowingSelected] = useState(false);
    const [exploreSelected, setExploreSelected] = useState(true);
    const [nearbySelected, setNearbySelected] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [posts, setPosts] = useState([]);

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

    useEffect(() => {
        (async () => {
            try {
                setIsloading(true);
                let response = await fetch('http://localhost:5000/api/posts');
                let responseData = await response.json();
                setIsloading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData)
                setPosts(responseData.posts);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
            setIsloading(false);
        })();
    }, [])

    return (

        <MainPageContainer>

            <ul className={`${styles.ul}`}>
                <li className={`${styles.li}`} onClick={clickFollowingHandler}>Following</li>
                <li className={`${styles.li}`} onClick={clickExploreHandler}>Explore</li>
                <li className={`${styles.li}`} onClick={clickNearbyHandler}>NearBy</li>
            </ul>

            {error && <ErrorModal error={error} onClear={() => setError(null)} />}

            <PostList posts={posts} />

        </MainPageContainer>

    )
};

export default Home;