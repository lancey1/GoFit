import React, { useState } from 'react'



function CollectionSelection(props) {

    const collections = props.collections;

    const [seletedCol, setSeletedCol] = useState();

    const formInputs = collections.map(item => (
        <div key={item.id}>
            <input type="radio" id={item.id} name="collection" value={item.title} onChange={(event) => { setSeletedCol(item.id) }} />
            <label htmlFor={item.id}>{item.title}?</label><br />
        </div>
    ))

    return (
        <div>
            <form onSubmit={props.onFormSubmit.bind(this, seletedCol)} >
                {formInputs}
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CollectionSelection