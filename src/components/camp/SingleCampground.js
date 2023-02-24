import React, { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { AiFillWarning } from "react-icons/ai"

import { AuthContext } from "./auth-context";
import ReviewList from "./ReviewList";
import StreetMap from "../map/StreetMap";
import LoadingSpinner from "../ui/LoadingSpinner"
import ImageSlider from "./ImageSlider";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";

import classes from "../../styles/SingleCampground.module.css"


const SingleCampground = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [location, setLocation] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [owner, setOwner] = useState()
    const [images, setImages] = useState()
    const [reviews, setReviews] = useState()
    const [showModal, setShowModal] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [campgrounds, setCampgrounds] = useState()
    const [error, setError] = useState()

    const campId = useParams().campId
    useEffect(() => {
        const fetchCampground = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campgrounds/${campId}`, {
                    method: "GET"
                })
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setTitle(responseData.title)
                setDescription(responseData.description)
                setLocation(responseData.location)
                setPrice(responseData.price)
                setOwner(responseData.owner.name)
                setImages(responseData.images)
                setCampgrounds(responseData)
                setReviews(responseData.reviews)
                setIsLoading(false)
            }
            catch (err) {
                setIsLoading(false)
                setError(err.message)
            }
        }
        fetchCampground()
    }, [campId])

    const deleteHandler = async () => {
        setShowModal(false)
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/campground/${campId}`, {
                method: "DELETE",
                body: null,
                headers: {
                    "Authorization": "Bearer " + auth.token
                }
            })
            setIsLoading(false)
            navigate("/campgrounds", { replace: true })
        } catch (err) {

        }
    }

    const showDeleteWarningHandler = () => {
        setShowModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowModal(false)
    }

    const clearError = () => {
        setError(null)
    }

    return <div className={classes.main}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <Modal show={showModal} onCancel={cancelDeleteHandler} header={<div className={classes.warningDiv}><AiFillWarning className={classes.warning}></AiFillWarning><p>Are you sure?</p></div>}
            footer={
                <>
                    <button className={classes.delete} onClick={deleteHandler}>Delete</button>
                    <button className={classes.cancelMod} onClick={cancelDeleteHandler}>Cancel</button>
                </>}
        >
            <p>Do you want to delete {title} campground?</p>
        </Modal>
        {!isLoading && <div className={classes.camp}>
            <ImageSlider images={images}></ImageSlider>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Rs {price}/day</p>
                <p>{location}</p>
                <p>Submitted by {owner}</p>
            </div>
            <div>
                {!isLoading && campgrounds.owner._id === auth.userId && <Link to={`/campground/${campId}/edit`}><button className={classes.edit}>Edit Campground</button></Link>}
                {!isLoading && campgrounds.owner._id === auth.userId && <button className={classes.delete} onClick={showDeleteWarningHandler}>Delete Campground</button>}
            </div>
        </div>}
        <div className={classes.map}>
            <div>
                {!isLoading && <StreetMap campground={campgrounds}></StreetMap>}
            </div>
            <div>
                <ReviewList campId={campId} reviews={reviews}></ReviewList>
            </div>
        </div>
    </div>
}

export default SingleCampground