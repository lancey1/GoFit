import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './CollectionItem.module.css';

const CollectionItem = props => {

    const history = useHistory();

    const clickHandler = () => {
        history.push(`/:userId/collections/:collectionId`);
    }

    return (
        <div className={`${styles.col_item}`} onClick={clickHandler}>
            CollectionItem
        </div>
    )

}

export default CollectionItem;

