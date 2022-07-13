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
    <div>
    <div onClick={viewProfile} className={`${styles.fellow_container}`}>
      <img className={`${styles.image}`}src={image} alt="" />
      <p>{name}</p>
      </div>
      <div>
       {auth.isLoggedIn && <FollowButton {...props} />}
      </div>
    </div>
  );
}

export default FellowsItem;
