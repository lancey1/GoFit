import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import styles from "./Login.module.css";

import teamfitLogo from "../../images/teamfit_logo.png";
import fitnessLogo from "../../images/loginlogo.png";

function Login() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const emailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Input fileds cannot be empty.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      auth.login(
        responseData.user.id,
        responseData.token
      );
      history.push(`/user/${responseData.user.id}`);
    } catch (error) {
      setError(error.message || "Unexpected error occured.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      {error && (
        <ErrorModal
          error={error}
          onClear={() => {
            setError(false);
          }}
        />
      )}
      <div className={styles.subContainer}>
        <div className={styles.leftSection}>
          <div className={styles.leftContainer}>
            <img className={styles.fitnessLogo} src={fitnessLogo} alt="" />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <img className={styles.teamfitLogo} src={teamfitLogo} alt="" />
          </div>

          <form className={styles.form} onSubmit={loginSubmitHandler}>
            <div>
              {/* <label htmlFor="user-email">Email</label> */}
              <input
                className={styles.signinText}
                type="email"
                id="user-email"
                onChange={emailOnChangeHandler}
                value={email}
                placeholder="Email"
              />
            </div>

            <div>
              {/* <label htmlFor="user-password">Password</label> */}
              <input
                className={styles.signinText}
                type="password"
                id="user-password"
                value={password}
                onChange={passwordOnChangeHandler}
                placeholder="Password"
              />
            </div>

            <button className={styles.signinButton}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
