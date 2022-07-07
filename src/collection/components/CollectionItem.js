import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./CollectionItem.module.css";

const CollectionItem = (props) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(`/:userId/collections/${props.id}`);
  };

  return (
    <div className={`${styles.col_item}`} onClick={clickHandler}>
      <h1>{props.title}</h1>
      <img className={`${styles.col_img}`} src={props.postImage} />
    </div>
  );
};

export default CollectionItem;
