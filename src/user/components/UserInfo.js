import React from "react";

const UserInfo = props => {
    const { userId } = props;
    return (
        <div>
            <p>
                {userId}
            </p>
            <p>Background img</p>
            <p>User avatar and User name(userID) and edit profile link</p>
            <p>Bio</p>
            <p>Age and location</p>
            <p>Following and number of followings, Follower and number of followers, likes and cols</p>
        </div>
    )
}

export default UserInfo