import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  //* logo(home), add, search bar, following, explore, profile
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={`${styles.homediv}`}>
        <li className={`${styles.li}`}>
          <NavLink
            activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`}
            to="/home"
            exact
          >
            Home
          </NavLink>
        </li>
      </div>

      <div className={`${styles.navlinks}`}>
        {auth.isLoggedIn && (
          <li className={`${styles.li}`}>
            <NavLink
              activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`}
              to={`/user/${auth.userId}`}
              exact
            >
              Profile
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li className={`${styles.li}`}>
            <NavLink
              activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`}
              to="/create"
              exact
            >
              Create Post
            </NavLink>
          </li>
        )}
        {/* ---------------------- */}

        {auth.isLoggedIn && (
          <div className={`${styles.dropdown}`}>
            <button className={`${styles.dropbtn}`}>Invitation</button>
            <div className={`${styles.content}`}>
              <p onClick={() => history.push(`/invite`)}>Send Invitation</p>
              <p onClick={() => history.push(`/${auth.userId}/sent`)}>Sent </p>
              <p onClick={() => history.push(`/${auth.userId}/invitations`)}>
                Received
              </p>
              <p onClick={() => history.push(`/${auth.userId}/accepted`)}>
                Accepted
              </p>
            </div>
          </div>
        )}
        {/* ============= */}

        {!auth.isLoggedIn && (
          <li className={`${styles.li}`}>
            <NavLink
              activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`}
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
              activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`}
              to="/login"
              exact
            >
              Login
            </NavLink>
          </li>
        )}

        {/* {auth.isLoggedIn &&
                    <li className={`${styles.li}`}>
                        <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to='/messenger' exact>Messages</NavLink>
                    </li>
                } */}
      </div>

      {auth.isLoggedIn && (
        <div className={`${styles.logoutdiv}`}>
          <li className={`${styles.li}`}>
            <button onClick={auth.logout}>Logout</button>
          </li>
        </div>
      )}
    </header>
  );
}

export default Navbar;
