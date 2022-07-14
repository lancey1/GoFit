import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import BackDrop from '../../shared/components/BackDrop';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './ReviewForm.module.css';
import './Stars.css'
import Success from '../../shared/components/Success';
import { useHistory } from 'react-router-dom';

// let { creator, appointment, text, rating } = req.body;
// app.use('/api/reviews', reviewsRoutes);
// router.post('/', createReview);
function ReviewForm(props) {

    const { appointmentId, reviewRecieverId, all, onRefresh } = props;

    console.log(reviewRecieverId);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [rating, setRating] = useState(null);
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const textChangeHandler = event => {
        setText(event.target.value);
    }

    const setRatingHandler = (val, event) => {
        console.log('select')
        console.log(val)
        setRating(val)
    }

    const okHandler = () => {
        console.log('ok')
        setSuccess(false);
        onRefresh();
        // return history.replace(`/${auth.userId}/sent`);
    }

    const submitReviewHandler = async (event) => {

        event.preventDefault();
        console.log(rating, text);

        if (!rating) {
            setError('Please leave your rating.');
        };
        try {
            let response = await fetch(`http://localhost:5000/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    text: text.trim(),
                    creator: auth.userId,
                    rating: rating,
                    appointment: appointmentId,
                    reciever: reviewRecieverId
                })
            });
            let responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            };
            setSuccess(true);
            console.log(responseData);
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    }

    return (

        <section>


            {error && <ErrorModal error={error} onClear={() => setError(null)} />}

            {success && (
                <BackDrop onClear={okHandler}>
                    <Success text='Review Created' onOk={okHandler} nextAction='Ok' info='Review is successfully created!'/>
                </BackDrop>
            )}

            <textarea placeholder='Write review...' value={text} onChange={textChangeHandler} />

            <div className="star-rating">
                <div className="thanks-msg">Thanks for your feedback !!!</div>
                <div className="star-input">
                    <input type="radio" name="rating" id="rating-5" />
                    <label htmlFor="rating-5" className="fas fa-star" onClick={setRatingHandler.bind(this, 5)}></label>
                    <input type="radio" name="rating" id="rating-4" />
                    <label htmlFor="rating-4" className="fas fa-star" onClick={setRatingHandler.bind(this, 4)}></label>
                    <input type="radio" name="rating" id="rating-3" />
                    <label htmlFor="rating-3" className="fas fa-star" onClick={setRatingHandler.bind(this, 3)}></label>
                    <input type="radio" name="rating" id="rating-2" />
                    <label htmlFor="rating-2" className="fas fa-star" onClick={setRatingHandler.bind(this, 2)}></label>
                    <input type="radio" name="rating" id="rating-1" />
                    <label htmlFor="rating-1" className="fas fa-star" onClick={setRatingHandler.bind(this, 1)}></label>
                    <form onSubmit={submitReviewHandler}>
                        <span className="rating-reaction"></span>
                        <button type="submit" className="submit-rating">Submit</button>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default ReviewForm