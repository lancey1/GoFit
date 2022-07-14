import React, { useContext } from "react";
import styles from "./FellowsItem.module.css";
import { useHistory } from "react-router-dom";
import FollowButton from "./FollowButton";
import { AuthContext } from '../../context/AuthContext';

function FellowsItem(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { name, image, userId } = props;
  const viewProfile = () => {
    history.push(`/user/${userId}`);
  }

  return (
    <React.Fragment>
      <div className={`${styles.fellow_container}`}>

        <div onClick={viewProfile} className={`${styles.avatar_p}`}>
          <img className={`${styles.image}`} src={image} alt="" />
        </div>

        <div className={`${styles.action}`}>
          <p >{name}</p>
          {auth.isLoggedIn && <FollowButton {...props} numChanger={props.numChanger} />}
        </div>

      </div>
      <hr />
    </React.Fragment>
  );
}

export default FellowsItem;
