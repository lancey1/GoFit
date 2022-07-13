import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import FellowsItem from "./FellowsItem";
import styles from "./FellowsList.module.css";
function FellowList(props) {
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${props.url}/${userId}`
        );
        const responseData = await response.json();
        setData(responseData.followings);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const followers = data.map((item) => {
    return (
      <FellowsItem
        {...item}
        image={item.image}
        key={item.id}
        userId={item.id}
        name={item.name}
      />
    );
  });

  return <div className={`${styles.container}`}>{followers}</div>;
}

export default FellowList;
