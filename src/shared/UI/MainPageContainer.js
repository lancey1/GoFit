import React from 'react'
import styles from './MainPageContainer.module.css';

function MainPageContainer(props) {
    return (
        <div className={`${styles.page}`}>{props.children}</div>
    )
}

export default MainPageContainer