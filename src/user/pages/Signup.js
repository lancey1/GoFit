import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import ImageUpload from "../../shared/components/ImageUpload";
import styles from './Signup.module.css';

function Signup() {

  const auth = useContext(AuthContext);
  const history = useHistory();

  const [image, setImage] = useState();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const imageOnInputHandler = (event, pickedFile, isValid) => {
    if (isValid) {
      setImage(pickedFile);
      console.log(pickedFile);
    };
  }

  const formSubmotHandler = async (event) => {
    event.preventDefault();

    if (!email || !name || !password || !confirmPassword || !age || !city || !image) {
      setError('Please check your inputs.');
      return;
    }

    if (password !== confirmPassword) {
      setError(`Passwords do not matches.`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('image', image);
      formData.append('age', age);
      formData.append('address', city);
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        body: formData
      });
      const responseData = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
      auth.login(responseData.user.id, responseData.user.name, responseData.token);
      history.push(`/user/${responseData.user.id}`);

    } catch (error) {
      console.log(error);
      setError(error.message || 'Unexpected error occured.');
    }
    setIsLoading(false);

  }


  return (
    <div>

      {error && <ErrorModal error={error} onClear={() => { setError(false) }} />}

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

        <ImageUpload onInput={imageOnInputHandler} />

        <button >Register</button>

      </form>

    </div>
  );
}

export default Signup;
