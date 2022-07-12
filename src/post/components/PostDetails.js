import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import CollectionSelection from './CollectionSelection';
import styles from './PostDetails.module.css';

function PostDetails(props) {

    const auth = useContext(AuthContext);
    const post = props.post;

    console.log(post);
    let likedAlready;
    if (auth && auth.isLoggedIn) {
        likedAlready = post.likedBy.includes(auth.userId);
    } else {
        likedAlready = false
    }

    const [likes, setLikes] = useState(post.likes);
    const [liked, setLiked] = useState(likedAlready);
    const [collections, setCollections] = useState(post.collections);
    const [commentsCount, setCommentsCount] = useState(post.comments.length);
    const [error, setError] = useState(null);

    const [collectionId, setCollectionId] = useState(null);

    const [userCollections, setUserCollections] = useState([]);
    const [collected, setCollected] = useState();

    const [openSelection, setOpenSelection] = useState(false);

    const clickStarHandler = async (event) => {
        if (!auth || !auth.isLoggedIn) {
            return setError('Login first');
        }
        
        if (!collected) {
            setOpenSelection(prev => !prev);
        }

        if (collected) {
            try {
                let response = await fetch(`http://localhost:5000/api/collections/remove/${collectionId}/${post.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                });
                let responseData = await response.json();
                console.log(responseData)
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setCollected(false);
                setCollections(prev => prev - 1);
            } catch (error) {
                console.log(error)
            };
        }
    }

    const likePostHandler = async (event) => {
        event.preventDefault();
        if (!auth || !auth.isLoggedIn) {
            return setError('Login first');
        }
        if (!liked) {
            try {
                let response = await fetch(`http://localhost:5000/api/posts/fav/${auth.userId}/${post.id}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: 'Bearer ' + auth.token,
                    }
                });
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData)
                setLikes(prev => prev + 1);
                setLiked(true);
            } catch (error) {
                console.log(error)
            };
        }
        if (liked) {
            try {
                let response = await fetch(`http://localhost:5000/api/posts/unfav/${auth.userId}/${post.id}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: 'Bearer ' + auth.token,
                    }
                });
                let responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                console.log(responseData)
                setLikes(prev => prev - 1);
                setLiked(false);
            } catch (error) {
                console.log(error)
            };
        }
    }

    const addToCollectionHandler = async (cId, event) => {
        event.preventDefault();
        if (!collected) {
            try {
                let response = await fetch(`http://localhost:5000/api/collections/add/${cId}/${post.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                });
                let responseData = await response.json();
                console.log(responseData)
                if (!response.ok) {
                    throw new Error(responseData.message);
                };
                setCollected(true);
                setCollections(prev => prev + 1);
                setOpenSelection(false);
            } catch (error) {
                console.log(error)
            };
        };

    }

    useEffect(() => {
        if (auth && auth.userId) {
            (async () => {
                try {
                    let response = await fetch(`http://localhost:5000/api/collections/postids/${auth.userId}`);
                    let responseData = await response.json();
                    console.log(responseData)
                    if (!response.ok) {
                        console.log(response);
                        throw new Error(responseData.message);
                    };
                    setUserCollections(responseData.collections);
                    for (const item of responseData.collections) {
                        if (item.posts.includes(post.id)) {
                            setCollected(true);
                            setCollectionId(item.id);
                        }
                    }
                } catch (error) {
                    console.log(error)
                    setError(error.message);
                }
            })();
        }
    }, [])

    return (
        <div>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            <div >
                <img className={`${styles.post_image}`} src={post.image} alt="Post" />
                <div className={`${styles.post_details}`}>
                    <p>{new Date(post.date).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}<br /> @ {post.address.split(',').slice(-3).join(', ')}</p>
                    <div className={`${styles.icons_div}`} >
                        <div className={`${styles.icon_with_p}`}>
                            <svg className={`${styles.clickable_likes} ${liked && styles.post_liked} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={likePostHandler}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <div>
                                <p>{likes}</p>
                            </div>
                        </div>

                        <div className={`${styles.icon_with_p}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.clickable_cols} ${collected && styles.post_collected} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={clickStarHandler}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <div>
                                <p>{collections}</p>
                            </div>
                        </div>

                        <div className={`${styles.icon_with_p}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.clickable_comments} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <div>
                                <p>{commentsCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {openSelection && <CollectionSelection className={`${styles.col_select}`} collections={userCollections} onFormSubmit={addToCollectionHandler} />}
                
            </div>
        </div>
    )
}

export default PostDetails