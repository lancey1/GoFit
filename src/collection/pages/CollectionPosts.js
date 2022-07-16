import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostList from '../../post/components/PostList';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './CollectionPosts.module.css';

const CollectionPosts = (props) => {

    const params = useParams();
    const { title, collectionId } = params;
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                let response = await fetch(`http://localhost:5000/api/collections/posts/${collectionId}`);
                let responseData = await response.json();
                setIsLoading(false);
                console.log(responseData)
                if (!response.ok) {
                    console.log(response);
                    throw new Error(responseData.message);
                };
                setPosts(responseData.posts);
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
            setIsLoading(false);
        })();
    }, [])

    return (

        <React.Fragment>
            {(!posts && isLoading) && <h1>Loading</h1>}

            {(posts && !isLoading) &&
                <div>
                    {error && <ErrorModal error={error} onClear={() => setError(null)} />}
                    <p className={styles.title}>{title}</p>
                    <PostList posts={posts} />
                </div>
            }
        </React.Fragment>
    )
}

export default CollectionPosts