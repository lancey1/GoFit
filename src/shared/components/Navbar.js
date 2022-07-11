import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from './Navbar.module.css';

function Navbar() {
    //* logo(home), add, search bar, following, explore, profile

    const auth = useContext(AuthContext);

    return (
        <header className={styles.header}>

            <div className={`${styles.homediv}`}>
                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/home' exact>Home</NavLink>
                </li>

            </div>

            <div className={`${styles.navlinks}`}>

                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to={`/user/${auth.userId}`} exact>Profile</NavLink>
                </li>

                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/create' exact>Create Post</NavLink>
                </li>

                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/create' exact>Send Invitation</NavLink>
                </li>

                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/signup' exact>Signup</NavLink>
                </li>

                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/login' exact>Login</NavLink>
                </li>

                <li className={`${styles.li}`}>
                    <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/messenger' exact>Messenger</NavLink>
                </li>

                {auth.isLoggedIn && <p>Logged in</p>}
                {!auth.isLoggedIn && <p>Need login</p>}

            </div>

            <div className={`${styles.logoutdiv}`}>
                <li className={`${styles.li}`}>
                    <button onClick={auth.logout}>Logout</button>
                </li>
            </div>

        </header>
    )
}

export default Navbar;