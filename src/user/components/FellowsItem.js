import React, {useContext} from "react";
import styles from "./FellowsItem.module.css";
import { useHistory } from "react-router-dom";
import FollowButton from "./FollowButton";
import { AuthContext } from '../../context/AuthContext';

function FellowsItem(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { name, image, userId} = props;
  const viewProfile = () => {
    history.push(`/user/${userId}`);
  }

  return (
    <div className={`${styles.fellow_container}`}>
      <div onClick={viewProfile}>
        <img className={`${styles.image}`}src={image} alt="" />
        <p className={styles.fellow_p}>{name}</p>
      </div>
      <div className={styles.button_ctn}>
       {auth.isLoggedIn && <FollowButton {...props} numChanger = {props.numChanger}/>}
      </div>
    </div>
  );
}

export default FellowsItem;
