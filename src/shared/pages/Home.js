//* Display All posts

import React, { Fragment } from "react";
import PostsContainer from '../UI/PostsContainer'
import PostItem from '../../post/components/PostItem';

function Home() {
    return (

        <React.Fragment>

            <ul>
                <li>Following</li>
                <li>Explore</li>
                <li>NearBy</li>
            </ul>
            <PostsContainer>
                <PostItem />
                <PostItem />
                <PostItem />
            </PostsContainer>
        </React.Fragment>

    )
};

export default Home;