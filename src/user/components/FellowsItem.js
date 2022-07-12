import React from "react";
import styles from "./FellowsItem.module.css";
import { useHistory } from "react-router-dom";


function FellowsItem(props) {
  const history = useHistory();

  const { name, image, userid} = props;

  const viewProfile = () => {
    history.push(`/user/${userid}`);
  }

  return (
    <div onClick={viewProfile} className={`${styles.fellow_container}`}>
      <img className={`${styles.image}`}src={image} alt="" />
      <p>{name}</p>
    </div>
  );
}

export default FellowsItem;
