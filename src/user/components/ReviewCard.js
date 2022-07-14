import React from 'react'
import stars from '../../shared/data/rating'
import styles from './ReviewCard.module.css'

function ReviewCard(props) {

    // <ReviewCard key={ele.id} avatar={ele.image} date={ele.date} rating={ele.rating} text={ele.text} />
    const { avatar, text, rating, date } = props;

    return (
        <React.Fragment>
            <div className={`${styles.card}`} >
                <div className={`${styles.img_text}`}>
                    <img className={`${styles.avatar}`} src={avatar} alt="" />
                    <p>{text}</p>
                </div>
                <div className={`${styles.rating_date}`}>
                    {stars[(rating - 1)]}
                    <p>{new Date(date).toLocaleString()}</p>
                </div>
            </div>
            <hr></hr>
        </React.Fragment>
    )
}

export default ReviewCard