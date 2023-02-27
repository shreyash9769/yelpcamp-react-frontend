import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { AuthContext } from "../camp/auth-context"
import LoadingSpinner from "../ui/LoadingSpinner"
import ErrorModal from "../ui/ErrorModal"

import classes from "../../styles/EditCampground.module.css"

const EditCampground = () => {
    const auth = useContext(AuthContext)
    const campId = useParams().campId
    const navigate = useNavigate()
    const [enteredTitle, setEnteredTitle] = useState("")
    const [enteredDescription, setEnteredDescription] = useState("")
    const [enteredPrice, setEnteredPrice] = useState("")
    const [enteredLocation, setEnteredLocation] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value)
    }
    const descriptionChangeHandler = (e) => {
        setEnteredDescription(e.target.value)
    }
    const locationChangeHandler = (e) => {
        setEnteredLocation(e.target.value)
    }
    const priceChangeHandler = (e) => {
        setEnteredPrice(e.target.value)
    }

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchCampground = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campgrounds/${campId}`, {
                method: "GET",
                body: null,
                headers: { "Authorization": "Bearer " + auth.token }
            })
            const responseData = await response.json()
            setEnteredTitle(responseData.title)
            setEnteredDescription(responseData.description)
            setEnteredLocation(responseData.location)
            setEnteredPrice(responseData.price)
            setIsLoading(false)
        }
        fetchCampground()
    }, [campId, auth.token])

    const cancelHandler = (e) => {
        navigate(`/campground/${campId}`, { replace: true })
    }

    const submitHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campground/${campId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    title: enteredTitle,
                    description: enteredDescription,
                    location: enteredLocation,
                    price: enteredPrice
                }),
                headers: { "Authorization": "Bearer " + auth.token, "Content-Type": "application/json" }
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setIsLoading(false)
            toast.success("Campground edited successfully")
            navigate(`/campground/${campId}`, { replace: true })
        }
        catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    return <div className={classes.main}>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        {!isLoading && <p>Edit Campground</p>}
        <form onSubmit={submitHandler} className={classes.form}>
            {!isLoading && <div>
                <div className={classes.inputs}>

                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={enteredTitle} onChange={titleChangeHandler}></input>
                </div>
                <div className={classes.inputs}>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" value={enteredLocation} onChange={locationChangeHandler}></input>
                </div>
                <div className={classes.inputs}>
                    <label htmlFor="price">Campground Price</label>
                    <input type="number" id="price" value={enteredPrice} onChange={priceChangeHandler}></input>
                </div>
                <div className={classes.inputs}>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={enteredDescription} onChange={descriptionChangeHandler}></textarea>
                </div>
                <div>
                    <button className={classes.submit}>Update Campground</button>
                    <button className={classes.cancel} type="button" onClick={cancelHandler}>Cancel</button>
                </div>
            </div>}
        </form>
    </div>

}

export default EditCampground