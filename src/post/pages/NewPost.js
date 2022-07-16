import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./NewPost.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/ImageUpload";
import ErrorModal from "../../shared/components/ErrorModal";
import createpostImg from '../../images/createpost.png';

function NewPost(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");

  const botRef = useRef(null);
  const tagsInputRef = useRef();

  const titleOnChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionOnChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const tagsOnChangeHandler = (event) => {
    let tagsArr;
    if (tagsInputRef.current.value) {
      tagsArr = tagsInputRef.current.value.split(',').map(item => item.trim().toUpperCase());
    } else {
      tagsArr = [];
    };
    setTags(tagsArr);
    console.log(tags)
  };

  const locationOnChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const imageOnInputHandler = (event, pickedFile, isValid) => {
    if (isValid) {
      setImage(pickedFile);
    };
  }

  const postSubmitHandler = async (event) => {
    event.preventDefault();

    if (!title || !description || !tags || !location) {
      setError('Please check your inputs.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', tags);
      formData.append('address', location);
      formData.append('image', image);
      formData.append('creator', auth.userId);

      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/posts/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      });
      const responseData = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      history.push(`/user/${auth.userId}`);

    } catch (error) {
      console.log(error);
      setError(error.message || 'Unexpected error occured.');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    botRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [image])

  return (
    <section className={`${styles.section}`}>
      {error && <ErrorModal error={error} onClear={() => { setError(null) }} />}
      <div className={styles.newpost_top}>
        <img className={styles.newpost_img} src={createpostImg} alt="" />
      </div>
      <form className={`${styles.newpostForm}`} onSubmit={postSubmitHandler}>

        <div className={styles.upload}>
          <ImageUpload onInput={imageOnInputHandler} text={'Select an image'} imageFor={'post'} />
        </div>

        <div className={styles.inputContainer}>
          <div>
            <input type="text" placeholder="Title" onChange={titleOnChangeHandler} value={title} />
          </div>
          <div>
            <textarea type="text" className={`${styles.text_input}`} placeholder="Post Description" onChange={descriptionOnChangeHandler} value={description} rows={4} />
          </div>
          <div>
            <input type="text" ref={tagsInputRef} placeholder="Tags (please separate by comma)" onChange={tagsOnChangeHandler} value={tags.join(',')} />
          </div>
          <div>
            <input type="text" placeholder="Location" onChange={locationOnChangeHandler} value={location} />
          </div>
          <div>
            <button className={`${styles.button}`}>Post</button>
          </div>

        </div>
      </form>
      <div ref={botRef} > </div>
    </section>
  );
}
export default NewPost;
