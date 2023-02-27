
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ErrorModal from "../ui/ErrorModal"
import LoadingSpinner from "../ui/LoadingSpinner"
import { AuthContext } from "../camp/auth-context"
import { toast } from "react-toastify"

import classes from "../../styles/NewCampgroundForm.module.css"

const NewCampgroundForm = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [enteredTitle, setEnteredTitle] = useState("")
    const [enteredDescription, setEnteredDescription] = useState("")
    const [enteredPrice, setEnteredPrice] = useState("")
    const [enteredLocation, setEnteredLocation] = useState("")
    const [images, setImages] = useState()
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()

    const imageHandler = (e) => {
        //setImages(prev => prev = e.target.files)
        setImages(e.target.files)
        //setImages({ images: [...images, ...e.target.files] })
    }
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

    const cancelHandler = () => {
        navigate("/campgrounds")
    }

    const clearError = () => {
        setError(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (!enteredTitle || !enteredDescription || !enteredLocation || !enteredPrice || !images) {
                throw new Error("Please enter all mandatory fields")
            }
            if (enteredDescription.length <= 20) {
                throw new Error("Description must contain more than 20 characters")
            }
            const formData = new FormData()
            for (let img of images) {
                formData.append("image", img)
            }
            formData.append("title", enteredTitle)
            formData.append("description", enteredDescription)
            formData.append("location", enteredLocation)
            formData.append("price", enteredPrice)

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campgrounds/new`, { method: "POST", body: formData, headers: { "Authorization": "Bearer " + auth.token } })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setIsLoading(false)
            toast.success("Campground added successfully")
            navigate("/campgrounds", { replace: true })
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
            <p>New Campground</p>
            <form onSubmit={submitHandler} encType="multipart/form-data" className={classes.form}>
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
                <div className={classes.inputs}>
                    <label htmlFor="image">Upload Campground Images</label>
                    <input type="file" id="image" multiple name="image" onChange={imageHandler}></input>
                </div>
                <div>
                    <button className={classes.submit}>Add Campground</button>
                    <button type="button" onClick={cancelHandler} className={classes.cancel}>Cancel</button>
                </div>
            </form>
        </div>}
    </>
}

export default NewCampgroundForm