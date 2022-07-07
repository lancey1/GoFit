import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
    //* logo(home), add, search bar, following, explore, profile
    return (
        <header className={styles.header}>


            <li className={`${styles.li}`}>
                <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/' exact>Home</NavLink>
            </li>

            <li className={`${styles.li}`}>
                <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/create' exact>Create</NavLink>
            </li>

            <li className={`${styles.li}`}>
                <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/signup' exact>Signup</NavLink>
            </li>

            <li className={`${styles.li}`}>
                <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/login' exact>Login</NavLink>
            </li>

            <li className={`${styles.li}`}>
                <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/:userId' exact>Profile</NavLink>
            </li>

            <li className={`${styles.li}`}>
                <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/messenger' exact>Messenger</NavLink>
            </li>

        </header>
    )
}

export default Navbar;