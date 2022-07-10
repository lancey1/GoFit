import React, { useContext, useState } from "react";
import styles from "./NewPost.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

function NewPost(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [file, setFile] = useState("");
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
      formData.append('creator', 1);

      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/posts/', {
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
    <main>
      <h1>Create a Post</h1>
      <div className={`${styles.container}`}>
        {!selectedImage &&(
          <h2> Upload an Image</h2>
        )}
        {selectedImage && (
          <div className={`${styles.preview}`}>
            <img src={URL.createObjectURL(selectedImage)} className={`${styles.image}`} alt="preview"/>
            <button onClick={() => setSelectedImage()}>Remove image</button>
          </div>
        )}
        <form className={`${styles.form}`} onSubmit={postSubmitHandler}>
          <div>
            <input accept="image/*" type="file" onChange={imageOnChange} />
          </div>
          <div>
            <input type="text" placeholder="Title" onChange={titleOnChangeHandler} value={title}/>
          </div>
          <div>
            <input type="text" placeholder="Add a Description" onChange={descriptionOnChangeHandler} value={description} />
          </div>
          <div>
            <input type="text" placeholder="Add some tags" onChange={tagsOnChangeHandler} value={tags}/>
          </div>
          <div>
            <input type="text" placeholder="Add an Address" onChange={locationOnChangeHandler} value={location}/>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </main>
  );
}
export default NewPost;
