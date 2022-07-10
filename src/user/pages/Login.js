import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import styles from './Login.module.css';

function Login() {

  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const emailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Input fileds cannot be empty.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'post',
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);
      if (!response.ok) {
        throw new Error(responseData.message);
      };
      auth.login();
      history.push('/user/:userId');
    } catch (error) {
      setError(error.message || 'Unexpected error occured.');
    };
    setIsLoading(false);
  }

  return (
    <div>

      {error && <ErrorModal error={error} onClear={() => { setError(false) }} />}

      <form onSubmit={loginSubmitHandler}>
        <div>
          <label htmlFor="user-email">Email</label>
          <input type='email' id="user-email" onChange={emailOnChangeHandler} value={email} />
        </div>

        <div>
          <label htmlFor='user-password'>Password</label>
          <input type='password' id="user-password" value={password} onChange={passwordOnChangeHandler} />
        </div>

        <button >Login</button>
      </form>
    </div>
  );
}

export default Login;
