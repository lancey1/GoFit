import React from 'react'
import { Link } from 'react-router-dom'
import CollectionItem from './CollectionItem'

const CollectionList = () => {
    return (
        <div>
            <p>List</p>
            <CollectionItem />
            <CollectionItem />
            <CollectionItem />
            <Link to='/:userId/create_collection'>Create new collection</Link>
        </div>
    )

}

export default CollectionList

