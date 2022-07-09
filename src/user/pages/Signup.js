import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from './Signup.module.css';

function Signup() {

  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  const emailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const nameOnChangeHandler = (event) => {
    setName(event.target.value);
  }

  const passwordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const confirmPasswordOnChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const ageOnChangeHandler = (event) => {
    setAge(event.target.value);
  }

  const cityOnChangeHandler = (event) => {
    setCity(event.target.value);
  }

  const formSubmotHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, email, password, image: 'dummy', age, address: city
        })
      });

      const responseData = await response.json();
      console.log(responseData);
      auth.login();
      history.push('/user/:userId');

    } catch (error) {
      console.log(error);
    }


  }


  return (
    <div>
      <h2>User Register</h2>

      <form className={`${styles.form}`} onSubmit={formSubmotHandler}>
        <div>
          <label htmlFor="user-email">Email</label>
          <input type='email' id="user-email" onChange={emailOnChangeHandler} value={email} />
        </div>

        <div>
          <label htmlFor='user-name'>Name</label>
          <input type='text' id="user-name" value={name} onChange={nameOnChangeHandler} />
        </div>

        <div>
          <label htmlFor='user-password'>Password</label>
          <input type='password' id="user-password" value={password} onChange={passwordOnChangeHandler} />
        </div>

        <div>
          <label htmlFor='user-confirm'>Confirm Password</label>
          <input type='password' id="user-confirm" value={confirmPassword} onChange={confirmPasswordOnChangeHandler} />
        </div>

        <div>
          <label htmlFor='user-age'>Age</label>
          <input type='number' id="user-age" value={age} onChange={ageOnChangeHandler} />
        </div>

        <div>
          <label htmlFor='user-city'>City</label>
          <input type='text' id="user-city" value={city} onChange={cityOnChangeHandler} />
        </div>

        <button >Create Account</button>

      </form>

      <h1>User</h1>
    </div>
  );
}

export default Signup;
