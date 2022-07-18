//* Display All posts

import React, { Fragment, useEffect, useState } from "react";
import PostList from "../../post/components/PostList";
import styles from "./Home.module.css";
import MainPageContainer from "../UI/MainPageContainer";
import ErrorModal from "../components/ErrorModal";
import haversine_distance from "../../util/Haversine_distance";
import "./SearchBar.css";

function Home(props) {
  const {
    userId,
    userLocation,
    address,
    posts,
    tagInputHandler,
    tagInputSubmitHandler,
    clickFollowingHandler,
    clickExploreHandler,
    clickNearbyHandler,
    followingSelected,
    exploreSelected,
    nearbySelected,
    tag,
    recSelected,
    clickRecHandler,
  } = props;

  // const [followingSelected, setFollowingSelected] = useState(false);
  // const [exploreSelected, setExploreSelected] = useState(true);
  // const [nearbySelected, setNearbySelected] = useState(false);
  const [error, setError] = useState(null);
  // const [posts, setPosts] = useState(null);

  // const [tag, setTag] = useState('');

  // const tagInputHandler = event => {
  //     setTag((event.target.value).toUpperCase());
  // };

  // const tagInputSubmitHandler = async event => {
  //     event.preventDefault();
  //     if (!tag || tag.trim().length === 0) return

  //     try {
  //         const response = await fetch(process.env.REACT_APP_BACKEND + `/posts/tags/${tag.trim()}`);
  //         const responseData = await response.json();
  //         if (!response.ok) {
  //             throw new Error(responseData.error);
  //         };
  //         setPosts(responseData.posts);
  //     } catch (error) {
  //         setError(error.message);
  //     }
  // }

  // const clickFollowingHandler = async () => {
  //     setFollowingSelected(true);
  //     setExploreSelected(false);
  //     setNearbySelected(false);
  //     console.log('Following');
  //     try {
  //         const response = await fetch(process.env.REACT_APP_BACKEND + `/posts/followings/${userId}`)
  //         const responseData = await response.json();
  //         if (!response.ok) {
  //             throw new Error(responseData.error);
  //         }
  //         let posts = [];
  //         for (let ele of responseData.user.follows) {
  //             posts = posts.concat(ele.posts);
  //         }
  //         setPosts(posts);
  //     } catch (error) {
  //         setError(error.message);
  //     }
  // };

  // const clickExploreHandler = () => {
  //     setFollowingSelected(false);
  //     setExploreSelected(true);
  //     setNearbySelected(false);
  //     console.log('Explore');
  //     (async () => {
  //         try {
  //             // setIsLoading(true);
  //             let response = await fetch(process.env.REACT_APP_BACKEND + '/posts');
  //             let responseData = await response.json();
  //             // setIsLoading(false);
  //             if (!response.ok) {
  //                 throw new Error(responseData.message);
  //             };
  //             setPosts(responseData.posts);
  //         } catch (error) {
  //             setError(error.message);
  //         }
  //         // setIsLoading(false);
  //     })();
  // };

  // const clickNearbyHandler = async () => {
  //     setFollowingSelected(false);
  //     setExploreSelected(false);
  //     setNearbySelected(true);
  //     console.log('Nearby');
  //     try {
  //         // setIsLoading(true);
  //         let response = await fetch(process.env.REACT_APP_BACKEND + '/posts');
  //         let responseData = await response.json();
  //         // setIsLoading(false);
  //         if (!response.ok) {
  //             throw new Error(responseData.message);
  //         };
  //         let nearbyPosts = [];
  //         nearbyPosts = responseData.posts.map(ele => ({ ...ele, distance: haversine_distance(userLocation, ele.location) })).filter(ele => (ele.distance < 50));
  //         setPosts(nearbyPosts);
  //     } catch (error) {
  //         setError(error.message);
  //     }
  // };

  // useEffect(() => {
  //     (async () => {
  //         try {
  //             // setIsLoading(true);
  //             let response = await fetch(process.env.REACT_APP_BACKEND + '/posts');
  //             let responseData = await response.json();
  //             // setIsLoading(false);
  //             if (!response.ok) {
  //                 throw new Error(responseData.message);
  //             };
  //             setPosts(responseData.posts);
  //         } catch (error) {
  //             setError(error.message);
  //         }
  //         // setIsLoading(false);
  //     })();
  // }, [])

  return (
    // <MainPageContainer>
    //     {error && <ErrorModal error={error} onClear={() => setError(null)} />}

    //     <form className="searchBox" onSubmit={tagInputSubmitHandler}>
    //         <input className="searchInput" type="text" name="" placeholder="Search" onChange={tagInputHandler} value={tag} />
    //         <button className="searchButton" >
    //             <i className="material-icons">
    //                 search
    //             </i>
    //         </button>
    //     </form>

    //     <ul className={`${styles.ul}`}>
    //         {userId && <li className={`${styles.li} ${followingSelected && styles.active}`} onClick={clickFollowingHandler}>Following</li>}
    //         <li className={`${styles.li} ${exploreSelected && styles.active}`} onClick={clickExploreHandler}>Explore</li>
    //         <li className={`${styles.li} ${nearbySelected && styles.active}`} onClick={clickNearbyHandler}>NearBy</li>
    //     </ul>

    //     {posts && <PostList posts={posts} />}

    // </MainPageContainer>

    <MainPageContainer>
      {error && <ErrorModal error={error} onClear={() => setError(null)} />}

      <form className="searchBox" onSubmit={tagInputSubmitHandler}>
        <input
          className="searchInput"
          type="text"
          name=""
          placeholder="Search Post by Tag"
          onChange={tagInputHandler}
          value={tag}
        />
        <button className="searchButton">
          <i className="material-icons">search</i>
        </button>
      </form>

      <ul className={`${styles.ul}`}>
        {userId && (
          <li
            className={`${styles.li} ${followingSelected && styles.active}`}
            onClick={clickFollowingHandler}
          >
            Following
          </li>
        )}
        <li
          className={`${styles.li} ${exploreSelected && styles.active}`}
          onClick={clickExploreHandler}
        >
          Explore
        </li>
        {userId && (
          <li
            className={`${styles.li} ${nearbySelected && styles.active}`}
            onClick={clickNearbyHandler}
          >
            Nearby
          </li>
        )}
        {userId && (
          <li
            className={`${styles.li} ${recSelected && styles.active}`}
            onClick={clickRecHandler}
          >
            Recommend
          </li>
        )}
      </ul>

      {posts && <PostList posts={posts} />}
    </MainPageContainer>
  );
}

export default React.memo(Home);
