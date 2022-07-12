import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import CollectionItem from "./CollectionItem";

const CollectionList = (props) => {

  const auth = useContext(AuthContext);

  const onSelectCollection = props.onSelectCollection;

  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const testData = [
    {
      title: 'Cats',
      id: 1
    },
    {
      title: 'Games',
      id: 2
    }
  ]

  const inputChangeHandler = event => {
    setTitle(event.target.value);
  }

  const addCollectionHandler = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch(`http://localhost:5000/api/collections/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: 'Bearer ' + auth.token
        },
        body: JSON.stringify({
          creator: auth.userId,
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

  const deleteColHandler = async (cId,event) => {
    event.stopPropagation();
    console.log(cId);
    try {
      let response = await fetch(`http://localhost:5000/api/collections/${cId}`, {
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
    (async () => {
      try {
        setIsLoading(true);
        let response = await fetch(`http://localhost:5000/api/collections/${auth.userId}`);
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
      <form onSubmit={addCollectionHandler}>
        <input type='text' placeholder="Add a new collection?" value={title} onChange={inputChangeHandler} />
        <button>Create</button>
      </form>
      {(collections && !isLoading) && colsList}
      {(!collections && isLoading) && <h1>Loading</h1>}

    </div>
  );
};

export default CollectionList;
