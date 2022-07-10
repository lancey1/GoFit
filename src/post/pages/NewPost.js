import React, { useContext, useState } from "react";
import styles from "./NewPost.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/ImageUpload";

function NewPost(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [file, setFile] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");

  const imageOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };
  const titleOnChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionOnChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const tagsOnChangeHandler = (event) => {
    setTags(event.target.value);
  };
  const locationOnChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const imageOnInputHandler = (event, pickedFile, isValid) => {
    if (isValid) {
      setImage(pickedFile);
      console.log(pickedFile);
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
      formData.append('image', file);
      // creator needs to be changed
      formData.append('creator', auth.userId);

      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: 'Bearer ' + auth.token
        },
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
    <section className={`${styles.section}`}>
      <form className={`${styles.form}`} onSubmit={postSubmitHandler}>

        <ImageUpload onInput={imageOnInputHandler} text={'Select an image'} imageFor={'post'} />

        <div>
          <input type="text" className={`${styles.text_input}`} placeholder="Add a title" onChange={titleOnChangeHandler} value={title} />
        </div>
        <div>
          <textarea type="text" className={`${styles.text_input}`} placeholder="Add text" onChange={descriptionOnChangeHandler} value={description} rows={4} />
        </div>
        <div>
          <input type="text" className={`${styles.text_input}`} placeholder="Tags (separate by coma)" onChange={tagsOnChangeHandler} value={tags} />
        </div>
        <div>
          <input type="text" className={`${styles.text_input}`} placeholder="Location" onChange={locationOnChangeHandler} value={location} />
        </div>
        <button className={`${styles.button}`}>Post</button>
      </form>
    </section>
  );
}
export default NewPost;
