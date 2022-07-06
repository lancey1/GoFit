//* Display All posts

import React, { Fragment } from "react";
import PostsContainer from '../UI/PostsContainer'
import PostList from '../../post/components/PostList';

function Home() {
    return (

        <React.Fragment>

            <ul>
                <li>Following</li>
                <li>Explore</li>
                <li>NearBy</li>
            </ul>
            <PostsContainer>
                <PostList/>
            </PostsContainer>
        </React.Fragment>

    )
};

export default Home;