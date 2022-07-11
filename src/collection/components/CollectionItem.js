import React from "react";
import Carousel from "react-elastic-carousel";
import { useHistory } from "react-router-dom";
import styles from "./CollectionItem.module.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

const CollectionItem = (props) => {

  const history = useHistory();

  const clickHandler = () => {
    history.push(`/:userId/collections/${props.id}`);
  };

  // const list = collectionData.map((elm) => {
  //   return (
  //     <div className={styles.col_item} onClick={clickHandler}>
  //       <h1>{elm.title}</h1>
  //       <img className={styles.col_img} src={elm.postImage} alt="" />
  //     </div>
  //   );
  // });

  const testList = props.data.map((elm) => {
    return (
      <div className={styles.col_item} onClick={clickHandler}>
        <h1>{elm.title}</h1>
        <img className={styles.col_img} src={elm.postImage} alt="" />
      </div>
    );
  });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{props.title}</h1>
      <div className={styles.col_container}>
        <Carousel
          breakPoints={breakPoints}>
          {testList}
        </Carousel>
      </div>
    </>
  );
};

export default CollectionItem;
