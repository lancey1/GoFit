import React from 'react'
import styles from './MainLayout.module.css';

function MainLayout(props) {
    return (
        <main className={`${styles.main}`}>
            {props.children}
        </main>
    )
}

export default MainLayout