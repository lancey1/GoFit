import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "./CollectionItem";

const CollectionList = () => {
  const collectionData = [
    {
      id: 0,
      title: "My collection #1",
      username: "Bob Pants",
      postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
    },
    {
      id: 1,
      title: "My collection #2",
      username: "Patrick Star",
      postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
    },
    {
      id: 2,
      title: "My collection #3",
      username: "Sandy Cheeks",
      postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
    },
  ];
  const collectionList = collectionData.map((elm) => {
    return (
      <CollectionItem
        key={elm.id}
        id={elm.id}
        title={elm.title}
        username={elm.username}
        postImage={elm.postImage}
        // any other props
      />
    );
  });

  return (
    <div>
      <p>List</p>
      <Link to="/:userId/create_collection">Create new collection</Link>
      {collectionList}
    </div>
  );
};

export default CollectionList;
