import { StylesContext } from '@material-ui/styles';
import React, { useState } from 'react'
import styles from './CollectionSelection.module.css';


function CollectionSelection(props) {

    const collections = props.collections;

    const [seletedCol, setSeletedCol] = useState();

    const formInputs = collections.map(item => (
        <div key={item.id}>
            <input type="radio" id={item.id} name="collection" value={item.title} onChange={(event) => { setSeletedCol(item.id) }} />
            <label className={`${styles.label}`} htmlFor={item.id}>{item.title}</label><br />
        </div>
    ))

    return (
        <div className={styles.col_select}>
            {collections.length === 0 && <p>Please add a collection first</p>}

            <div className={styles.col_select_container}>

            {(collections && collections.length > 0) &&
                    <form onSubmit={props.onFormSubmit.bind(this, seletedCol)} >
                    {formInputs}
                    <input className={styles.col_select_btn} type="submit" value="Add To Collection" />
                </form>
                }

            </div>

        </div>
    )
}

export default CollectionSelection