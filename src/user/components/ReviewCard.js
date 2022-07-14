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
                    <p>{new Date(date).toLocaleString()}</p>
                    {stars[(rating - 1)]}
                </div>
            </div>
            <hr></hr>
        </React.Fragment>
    )
}

export default React.memo(ReviewCard);