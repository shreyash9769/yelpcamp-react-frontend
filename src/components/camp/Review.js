import { useState, useContext } from "react"
import { BsStarFill } from "react-icons/bs"
import { AiFillWarning } from "react-icons/ai"
import { toast } from "react-toastify"

import { AuthContext } from "./auth-context"
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

import classes from "../../styles/Review.module.css"

const Review = (props) => {
    const [showModal, setShowModal] = useState()
    const [isLoading, setIsLoading] = useState()
    const auth = useContext(AuthContext)

    const showWarningHandler = () => {
        setShowModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowModal(false)

    }

    const deleteHandler = async (e) => {
        setShowModal(false)
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/campground/${props.campId}/${props.reviewId}`, {
                method: "DELETE",
                body: null,
                headers: {
                    "Authorization": "Bearer " + auth.token
                }
            })
            setIsLoading(false)
            window.location.reload()
            toast.success("Review deleted successfully")
        } catch (err) {

        }
    }
    return <>
        <div className={classes.main}>
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <Modal show={showModal} onCancel={cancelDeleteHandler} header={<div className={classes.warningDiv}><AiFillWarning className={classes.warning}></AiFillWarning><p>Are you sure?</p></div>}
                footer={
                    <>
                        <button className={classes.delete} onClick={deleteHandler}>Delete</button>
                        <button className={classes.cancel} onClick={cancelDeleteHandler}>Cancel</button>
                    </>}
            >
                <p>Do you want to delete this review?</p>
            </Modal>
            <div className={classes.starDiv}>
                {props.rating ? <h3 className={classes.h3}>{props.name} &#40;{props.rating}<BsStarFill className={classes.star}></BsStarFill>
                    &#41;</h3> : <h3 className={classes.h3}>{props.name}</h3>}
            </div>
            <p>{props.body}</p>
            {auth.isLoggedIn && auth.userId === props.userId && <button
                onClick={showWarningHandler} className={classes.delete}>Delete</button>}
        </div>
    </>
}

export default Review