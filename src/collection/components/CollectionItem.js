import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import styles from "./CollectionItem.module.css";


const CollectionItem = (props) => {

  const history = useHistory();

  const clickHandler = () => {
    history.push(`/:userId/collections/${props.title}/${props.id}`);
  };

  return (
    <div className={`${styles.col_container}`} onClick={clickHandler}>

      <h3>{props.title}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={props.onDelete.bind(this, props.id)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>

    </div>
  );
};

export default CollectionItem;
