import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NewReview from '../../review/components/NewReview';
import BackDrop from '../../shared/components/BackDrop';
import styles from './AppointmentItem.module.css'

function AppointmentItem(props) {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const { id, title, description, revieverAvatar, address, recieverName, appointmentDate, location, pending, recieverAccepted, recieverRejected, creatorName, creatorAvatar, reviews } = props;


    let reviewers = [];
    let avgRating;
    if (reviews && reviews.length > 0) {
        reviewers = reviews.map(ele => ele.creator.id);
        let sum = 0;
        reviews.forEach(ele => {
            sum += ele.rating;
        });
        avgRating = sum / reviews.length;
    }

    const [showReview, setShowReview] = useState(false);

    //* check if Review Made By Current User, Do not display add to review button if a review already made
    const [displayReviewBtn, setDisplayReviewBtn] = useState(!reviewers.includes(auth.userId));

    const btnClickHandler = (event) => {
        event.stopPropagation();
        history.push(`/${auth.userId}/appointment/${id}`)
    }

    const hideShowReview = event => {
        event.stopPropagation();
        setShowReview(false);
    }

    const reviewBtnClickHandler = event => {
        event.stopPropagation();
        console.log('Now open review page');
        setShowReview(true);
    }
    const appointmentFinished = ((new Date(appointmentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) < 0);

    return (

        <React.Fragment>

            {showReview && (
                <BackDrop onClear={hideShowReview}>
                    <NewReview appointmentId={id} />
                </BackDrop>
            )}

            <article className={`${styles.article}`} >

                <div className={`${styles.user}`} >
                    <div className={`${styles.user_img_name_follow}`}>
                        <img className={`${styles.avatar}`} src={creatorAvatar} alt="" />
                        <div className={`${styles.name_follow}`}>
                            <h4>{`${creatorName}`}</h4>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    <div className={`${styles.user_img_name_follow}`}>
                        <img className={`${styles.avatar}`} src={revieverAvatar} alt="" />
                        <div className={`${styles.name_follow}`}>
                            <h4>{`${recieverName}`}</h4>
                        </div>
                    </div>

                    <div className={`${styles.info}`}>
                        <h3>{`Title: ${title}`}</h3>
                        <p>{new Date(appointmentDate).toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>

                </div>

                <div className={`${styles.status}`}>
                    {pending && <p>Pending</p>}
                    {(recieverAccepted && !appointmentFinished) && <p>Accepted</p>}
                    {recieverRejected && <p>Rejected</p>}
                </div>

                {(appointmentFinished && recieverAccepted && displayReviewBtn) &&
                    <button onClick={reviewBtnClickHandler} className={`${styles.btn}`}>Add Review</button>
                }
                {(appointmentFinished && recieverAccepted && !displayReviewBtn) && (
                    <div className={`${styles.rating_div}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p>{avgRating}</p>
                    </div>

                )}
                <button onClick={btnClickHandler} className={`${styles.btn}`}>Details</button>


            </article>

        </React.Fragment>
    )
}

export default AppointmentItem