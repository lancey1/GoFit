import React from "react";
import { useParams } from "react-router-dom";

const Profile = props => {

    const params = useParams();
    const { userId } = params;

    return (
        <div>
            {userId}
        </div>
    )
}

export default Profile;