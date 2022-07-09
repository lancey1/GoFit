import React, { useState } from 'react'
import CollectionList from '../../collection/components/CollectionList';
import PostList from '../../post/components/PostList';
import styles from './Content.module.css';

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

const Content = (props) => {

    const [myPostsSelected, setMypostsSelected] = useState(true);
    const [myCollectionsSelected, setMyCollectionsSelected] = useState(false);
    const [myLikesSelected, setMyLikessSelected] = useState(false);

    const myPostsClickHandler = () => {
        setMypostsSelected(true);
        setMyCollectionsSelected(false);
        setMyLikessSelected(false);
    }

    const myColsClickHandler = () => {
        setMypostsSelected(false);
        setMyCollectionsSelected(true);
        setMyLikessSelected(false);
    }

    const myLikesClickHandler = () => {
        setMypostsSelected(false);
        setMyCollectionsSelected(false);
        setMyLikessSelected(true);
    }

    return (
        <div>

            <ul className={`${styles.ul}`}>
                <li className={`${styles.li}`} onClick={myPostsClickHandler}>My Posts</li>
                <li className={`${styles.li}`} onClick={myColsClickHandler}>Collections</li>
                <li className={`${styles.li}`} onClick={myLikesClickHandler}>Likes</li>
            </ul>

            {myPostsSelected && <PostList posts={postData} />}

            {myCollectionsSelected && <CollectionList />}

            {myLikesSelected && <PostList posts={postData} />}

        </div>
    )
}

export default Content