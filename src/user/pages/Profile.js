import React from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Content from "../components/Content";

const Profile = props => {

    const params = useParams();
    const { userId } = params;

    return (
        <div>

            <UserInfo userId={userId} />
            <hr></hr>

            <Content />

        </div>

    )
}

export default Profile;