import { StylesContext } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import CollectionItem from "./CollectionItem";
import styles from "./CollectionList.module.css";

const CollectionList = (props) => {

  const auth = useContext(AuthContext);

  const { userId, onSelectCollection } = props;

  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const inputChangeHandler = event => {
    setTitle(event.target.value);
  }

  const addCollectionHandler = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch(process.env.REACT_APP_BACKEND + `/collections/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: 'Bearer ' + auth.token
        },
        body: JSON.stringify({
          creator: userId,
          title: title
        })
      });
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      };
      setRefresh(prev => !prev);
      setTitle('');
      onSelectCollection();
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  }
  //! onClick={props.onDelete.bind(this, props.id)}
  const deleteColHandler = async (cId, event) => {
    event.stopPropagation();
    console.log(cId);
    try {
      let response = await fetch(process.env.REACT_APP_BACKEND + `/collections/${cId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: 'Bearer ' + auth.token
        },
      });
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      };
      setRefresh(prev => !prev);
      onSelectCollection();
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  }

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          setIsLoading(true);
          let response = await fetch(process.env.REACT_APP_BACKEND + `/collections/${userId}`);
          let responseData = await response.json();
          setIsLoading(false);
          console.log(responseData)
          if (!response.ok) {
            console.log(response);
            throw new Error(responseData.message);
          };
          setCollections(responseData.collections)
        } catch (error) {
          console.log(error)
          setError(error.message);
        }
        setIsLoading(false);
      })();
    }
  }, [refresh])

  const colsList = collections.map((ele) => {
    return (
      <CollectionItem
        key={ele.id}
        id={ele.id}
        title={ele.title}
        onDelete={deleteColHandler}
      />
    )
  })

  return (
    <div>
      {error && <ErrorModal error={error} onClear={() => setError(null)} />}
      {auth.userId === userId && (
        <form onSubmit={addCollectionHandler} >
          <div className={styles.collectionContainer}>
            <img className={styles.collectionIcon} src="https://cdn-icons-png.flaticon.com/512/202/202614.png" />
            <input className={styles.colinput} type='text' placeholder="Add a New Collection?" value={title} onChange={inputChangeHandler} />
            <button className={styles.colcreate_btn}>Create</button>
          </div>
        </form>
      )}
      {(collections && !isLoading) && colsList}
      {(!collections && isLoading) && <h1>Loading</h1>}

    </div>
  );
};

export default CollectionList;


