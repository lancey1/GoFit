import React from "react";
import styles from "./UserInfo.module.css";
import Fellows from "./FellowsList";
import { useState } from "react";
import DarkerBackDrop from "../../shared/components/DarkerBackDrop";

const UserInfo = (props) => {
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const showFollowerClick = (event) => {
    setShowFollower((current) => !current);
  };
  const showFollowingClick = (event) => {
    setShowFollowing((current) => !current);
  };
  const removeList = (event) => {
    if (showFollower === true || showFollowing === true) {
      setShowFollower(false);
      setShowFollowing(false);
    }
  };

  const { user } = props;
  let gymMembership = [];
  if (user && user.gymMembership.length !== 0) {
    gymMembership = user.gymMembership.join(", ");
  }

  let athleteTypes = [];
  if (user && user.athleteTypes.length !== 0) {
    athleteTypes = user.athleteTypes.join(", ");
  }

  let userAddress;
  if (user) {
    var sectionStyle = {
      width: "100%",
      height: "410px",
      backgroundImage: `url(${user.backgroundImage})`,
      backgroundSize: `cover`,
    };

    userAddress = user.address.split(",").slice(-3).join(", ");
  }

  return (
    <div onClick={removeList} className={`${styles.containerdiv}`}>
      {user && (
        <section style={sectionStyle}>
          <div className={`${styles.container}`}>
            <div className={`${styles.avatar_name}`}>
              <img className={`${styles.avatar}`} src={user.image} alt="" />
              <div className={`${styles.name_id}`}>
                <p>{user.name}</p>
                <span>id: {user.id}</span>
              </div>
            </div>
            <p>{user.bio}</p>
            <hr className={`${styles.hr}`} />

            <p>Age {user.age}</p>
            <p>{userAddress}</p>

            {gymMembership && <p>Gym Membership: {gymMembership}</p>}
            {athleteTypes && <p>Athlete Types: {athleteTypes}</p>}

            <div className={`${styles.follow_edit}`}>
              <div className={`${styles.follow}`}>
                <p onClick={showFollowingClick}>
                  Following <b>{user.follows.length}</b>
                </p>
                {showFollowing && (
                  <DarkerBackDrop>
                    <Fellows fellow={user.follows} />
                  </DarkerBackDrop>
                )}
                <p onClick={showFollowerClick}>
                  Followers<b>{user.followers.length}</b>
                </p>
                {showFollower && (
                  <DarkerBackDrop>
                    <Fellows fellow={user.followers} />
                  </DarkerBackDrop>
                )}
                <p>
                  <em>Likes</em> <b>{user.likes} </b>{" "}
                </p>
              </div>
              <button
                className={`${styles.userinfo_btn}`}
                onClick={props.onShowEditPage}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserInfo;
