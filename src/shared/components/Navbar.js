import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

import gofitLogo from '../../images/gofitlogo.png';

function Navbar() {
  //* logo(home), add, search bar, following, explore, profile
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={`${styles.homediv}`}>
        <li className={`${styles.li}`}>
            <img onClick= {()=>history.push('/home')}className={styles.homeLogo} src={gofitLogo} alt="" />
        </li>
      </div>
      <div className={`${styles.navlinks}`}>

        {auth.isLoggedIn && (
          <li className={`${styles.li}`}>
            <NavLink
              className={`  ${styles.a}`}
              activeClassName={`${styles.active}`}
              to="/create"
              exact
            >
              Create Post
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <div className={`${styles.dropdown}`}>
            <div className={`${styles.dropbtn}`}>
              <p>Invitation</p>
            </div>

            <div className={`${styles.content}`}>
              <p onClick={() => history.push(`/invite`)}>Send Invites</p>
              <p onClick={() => history.push(`/${auth.userId}/sent`)}>All Invites </p>
              <p onClick={() => history.push(`/${auth.userId}/invitations`)}>
                Received Invites
              </p>
              <p onClick={() => history.push(`/${auth.userId}/accepted`)}>
                Accepted Invites
              </p>
            </div>

          </div>
        )}
        {!auth.isLoggedIn && (
          <li className={`${styles.li}`}>
            <NavLink
              className={`  ${styles.a}`}
              activeClassName={`${styles.active} `}
              to="/signup"
              exact
            >
              Signup
            </NavLink>
          </li>
        )}

        {!auth.isLoggedIn && (
          <li className={`${styles.li}`}>
            <NavLink
              className={`  ${styles.a}`}
              activeClassName={`${styles.active}`}
              to="/login"
              exact
            >
              Login
            </NavLink>
          </li>
        )}

          {auth.isLoggedIn && (
          <div className={`${styles.dropdown} ${styles.avatarlink}`}>
            <div className={`${styles.dropbtn}`}>
              <img className={styles.avatar} src={auth.user.image} alt="user" />
            </div>
            <div className={`${styles.content}`}>
              <p onClick={() => history.push(`/user/${auth.userId}`)}>Profile</p>
              <p onClick={auth.logout}> Logout </p>
            </div>
          </div>)}
      </div>
    </header>
  );
}

export default Navbar;
