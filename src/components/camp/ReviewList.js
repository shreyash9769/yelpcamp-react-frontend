import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CSSTransition } from 'react-transition-group';

import { AuthContext } from "./auth-context"
import LoadingSpinner from "../ui/LoadingSpinner"
import Review from "./Review"
import ErrorModal from "../ui/ErrorModal";

import classes from "../../styles/ReviewList.module.css"

const ReviewList = (props) => {
    const [isButtonClicked, setIsButtonClicked] = useState()
    const [enteredReview, setEnteredReview] = useState()
    const [enteredRating, setEnteredRating] = useState(3)
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()
    const auth = useContext(AuthContext)
    const reviewButtonHandler = (event) => {
        event.preventDefault()
        setIsButtonClicked(true)
    }

    const cancelHandler = (event) => {
        event.preventDefault()
        setIsButtonClicked(false)
    }

    const reviewHandler = (e) => {
        setEnteredReview(e.target.value)
    }

    const ratingChangeHandler = (e) => {
        setEnteredRating(e.target.value)
    }

    const clearError = () => {
        setError(null)
    }

    const submitHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campground/${props.campId}/review`, {
                method: "POST",
                body: JSON.stringify({
                    body: enteredReview,
                    rating: enteredRating
                }),
                headers: {
                    "Authorization": "Bearer " + auth.token,
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setIsLoading(false)
            window.location.reload()
        }
        catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }
    return <>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        {!isLoading && <div className={classes.main}>
            {!auth.isLoggedIn && <Link to="/login"><button className={classes.leaveReview}>Leave a review</button></Link>}
            {auth.isLoggedIn && <button className={classes.leaveReview} onClick={reviewButtonHandler}>Leave a review</button>}
            <CSSTransition
                in={isButtonClicked}
                mountOnEnter
                unmountOnExit
                timeout={600}
                classNames={{
                    enter: classes.formEnter,
                    enterActive: classes.formEnterActive,
                    exit: classes.formExit,
                    exitActive: classes.formExitActive
                }}
            >
                {auth.isLoggedIn && <div className={classes.reviewDiv}>
                    <form onSubmit={submitHandler}>
                        <div className={classes.rating}>
                            <label htmlFor="rating">Stars:</label>
                            <input id="rating" type="range" min={1} max={5} step={1} value={enteredRating} onChange={ratingChangeHandler}></input><span>{enteredRating}</span>
                        </div>
                        <div className={classes.textarea}>
                            <textarea onChange={reviewHandler} value={enteredReview}></textarea>
                        </div>
                        <button className={classes.submit}>Submit</button>
                        <button type="button" className={classes.cancel} onClick={cancelHandler}>Cancel</button>
                    </form>
                </div>}
            </CSSTransition>
            {props.reviews && props.reviews.length !== 0 && <h2 className={classes.p}>Reviews</h2>}
            {props.reviews && props.reviews.length !== 0 && props.reviews.map((review) => <Review key={review._id} userId={review.author._id} name={review.author.name} body={review.body} rating={review.rating} campId={props.campId} reviewId={review._id}></Review>)}

        </div>
        }
    </>
}

export default ReviewList