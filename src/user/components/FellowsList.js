import React, { useEffect, useState } from "react";
import FellowsItem from "./FellowsItem";
import styles from "./FellowsList.module.css";

function Fellows(props) {
  const [data, setData] = useState([]);
  const { fellow } = props;

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all(
          fellow.map((item) => {
            return fetch(`http://localhost:5000/api/user/${item}`);
          })
        );
        let responseDatas = await Promise.all(
          responses.map((res) => res.json())
        );
        setData(responseDatas);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  const followers = data.map((item) => {
    return <FellowsItem key= {item.id} userid= {item.user.id} name={item.user.name} image={item.user.image} />;
  });

  return <div className = {`${styles.container}`} >{followers}</div>;
}

export default Fellows;
