import React, { useContext, useEffect } from "react";
import styles from "./UserInfo.module.css";
import FellowList from "./FellowsList";
import { useState } from "react";
import DarkerBackDrop from "../../shared/components/DarkerBackDrop";
import Notification from "./Notification";
import UnreadComments from "../../comment/components/UnreadComments";
import BackDrop from "../../shared/components/BackDrop";
import { useHistory } from "react-router-dom";
import ReviewCardsList from "./ReviewCardsList";
import { AuthContext } from "../../context/AuthContext";

const UserInfo = (props) => {

  const auth = useContext(AuthContext);

  const history = useHistory();
  const { user } = props;
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showNotificationDiv, setShowNotificationDiv] = useState(true);
  const [showUnreadComments, setShowUnreadComments] = useState(false);
  const [numOfFollows, setNumOfFollows] = useState(user.follows.length);
  const [numOfFollowers, setNumOfFollowers] = useState(user.followers.length);
  const [error, setError] = useState(null);

  const [showFeedBack, setShowFeedback] = useState(false);
  const [reviews, setReviews] = useState();
  // get all feed backs and filter
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/user/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
            Authorization: 'Bearer ' + auth.token
          }
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData)
        setReviews(responseData.reviews.filter(ele => ele.creator.id !== user.id));
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [])

  // ! here here here here here here here here here here here here here here here here here here here here
  const onShowFeedbackHandler = () => {
    console.log('ok');
    setShowFeedback(prev => !prev);
  }

  const onChangeNotificationHandler = () => {
    setShowNotificationDiv(false);
  };
  {/* <NavLink activeClassName={`${styles.active} ${styles.a} ${styles.navlinks}`} to={`/${auth.userId}/invitations`} exact>Invites(Recieved)</NavLink> */ }
  const onRedirectToNewInvitations = event => {
    history.push(`/${user.id}/invitations`)
  }

  const onShowUnreadHandler = () => {
    setShowUnreadComments((prev) => !prev);
  };

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
      {showUnreadComments && (
        <BackDrop>
          <UnreadComments
            userId={user.id}
            onChangeShowUnread={onShowUnreadHandler}
            onChange={onChangeNotificationHandler}
          />
        </BackDrop>
      )}

      {showFeedBack && (
        <BackDrop onClear={onShowFeedbackHandler}>
          <ReviewCardsList
            userId={user.id}
            onChange={onShowFeedbackHandler}
            reviews={reviews}
          />
        </BackDrop>
      )}

      {user && (
        <section style={sectionStyle}>

          <div className={`${styles.container}`}>

            <div className={`${styles.avatar_name}`}>

              <img className={`${styles.avatar}`} src={user.image} alt="" />

              <div className={`${styles.name_id}`}>
                <p>{user.name}</p>
                <span>id: {user.id}</span>
              </div>

              {auth.user && (
                <div>
                  {user.unreadNotifications > 0 && showNotificationDiv && (
                    <div
                      className={`${styles.notification}`}
                      onClick={onShowUnreadHandler}
                    >
                      <Notification text={user.unreadNotifications} title={`New comments`} />
                    </div>
                  )}

                  {user.invitations.length > 0 && showNotificationDiv && (
                    <div
                      className={`${styles.notification}`}
                      onClick={onRedirectToNewInvitations}
                    >
                      <Notification text={user.invitations.length} title={`New invitation`} />
                    </div>
                  )}
                </div>
              )}

            </div>
            {/* HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE */}

            <div>

              <p>{user.bio}</p>

              {(reviews && reviews.length > 0) && (
                <button className={`${styles.feedback_btn}`} onClick={onShowFeedbackHandler}>Feedbacks</button>
              )}

              {(reviews && reviews.length === 0) && (
                <p className={`${styles.nofeedback_p}`}>No feedbacks yet</p>
              )}

            </div>

            <hr></hr>

            <p>Age {user.age}</p>

            <p>{userAddress}</p>

            {gymMembership.length > 0 && <p>Gym Membership: {gymMembership}</p>}
            {athleteTypes.length > 0 && <p>Activities: {athleteTypes}</p>}

            <div className={`${styles.follow_edit}`}>

              <div className={`${styles.follow}`}>

                <p onClick={showFollowingClick}>
                  Following <b>{numOfFollows}</b>
                </p>
                {showFollowing && (
                  <DarkerBackDrop>
                    <FellowList
                      url={"followings"}
                      numChanger={(diff) => setNumOfFollows(numOfFollows + diff)}
                      text={"Following"}
                    />
                  </DarkerBackDrop>
                )}
                <p onClick={showFollowerClick}>
                  Followers <b>{numOfFollowers}</b>
                </p>
                {showFollower && (
                  <DarkerBackDrop>
                    <FellowList
                      url={"followers"}
                      numChanger={(diff) => setNumOfFollows(numOfFollows + diff)}
                      text={"Followers"}
                    />
                  </DarkerBackDrop>
                )}
                <p>
                  <em>Likes</em> <b>{user.likes} </b>
                </p>
              </div>

              {auth.user && (
                <div>
                  <button
                    className={`${styles.userinfo_btn}`}
                    onClick={props.onShowEditPage}
                  >
                    Edit Profile
                  </button>
                </div>
              )}



            </div>

          </div>

        </section>
      )}

    </div>
  );
};

export default UserInfo;
