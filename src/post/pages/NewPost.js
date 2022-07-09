import React, { useState } from "react";
import styles from "./NewPost.module.css";

function NewPost(props){
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  return (
    <main>
      <h3>New Post</h3>
      <div className={`${styles.container}`}>
        <form>
          
          <label>Title</label>
          <input></input>
        </form>
      </div>
    </main>
  );
};
export default NewPost;


{/* <div className={`${styles.input}`}>
          <input accept="image/*" type="file" onChange={imageChange} />
        </div>
        {selectedImage && (
          <div>
            <div className={`${styles.preview}`}>
              <img
                src={URL.createObjectURL(selectedImage)}
                className={`${styles.image}`}
                alt="preview"
              />
              <button onClick={()=>setSelectedImage()}>Remove image</button>
            </div>
          </div>
        )}
        <div className={`${styles.form}`}>
          <form>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Add a Description" />
            <input type="text" placeholder="Add a Location" />
            <button>Submit</button>
          </form>
        </div> */}