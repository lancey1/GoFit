import React from "react";
import styles from './UserInfo.module.css';

const UserInfo = props => {
    const { user } = props;

    let userAddress;
    if (user) {
        var sectionStyle = {
            width: "100%",
            height: "400px",
            backgroundImage: `url(${user.backgroundImage})`,
            backgroundSize: `cover`
        };

        userAddress = user.address.split(',').slice(-3).join(', ')
    }

    return (
        <div className={`${styles.containerdiv}`}>
            {user &&
                <section style={sectionStyle} >
                    <div className={`${styles.container}`}>
                        <div className={`${styles.avatar_name}`}>
                            <img className={`${styles.avatar}`} src={user.image} alt="" />
                            <div className={`${styles.name_id}`} >
                                <p>{user.name}</p>
                                <span>id: {user.id}</span>
                            </div>
                        </div>
                        <p>{user.bio}</p>
                        <hr className={`${styles.hr}`}/>

                        <p>Age {user.age}</p>
                        <p>{userAddress}</p>

                        <div className={`${styles.follow_edit}`} >
                            <div className={`${styles.follow}`}>
                                <p><em>Following</em> <b>{user.follows.length}</b></p>
                                <p><em>Followers</em> <b>{user.followers.length}</b></p>
                                <p><em>Likes</em> <b>{user.likes} </b> </p>
                            </div>

                            <button>Edit Profile</button>
                        </div>

                    </div>
                </section>
            }

        </div >
    )
}

export default UserInfo