import React, { Fragment, useState } from "react";
import styles from './Login.module.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  }


  return (
    <div>
      <form>
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
