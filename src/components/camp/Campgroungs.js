import { useState, useEffect } from "react"

import CampList from "./CampList"
import DisplayMap from "../map/DisplayMap"
import LoadingSpinner from "../ui/LoadingSpinner"

import classes from "../../styles/Campgrounds.module.css"

const Campgrounds = props => {
    const [campgrounds, setCampgrounds] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campgrounds`, { method: "GET" })
                const responseData = await response.json()
                setCampgrounds(responseData)
                setIsLoading(false)
            }
            catch (err) {

            }
        }
        fetchCampgrounds()
    }, [])
    return <div className={classes.main}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        {!isLoading && <DisplayMap cityData={campgrounds}></DisplayMap>}
        {!isLoading && <h1>All Campgrounds</h1>}
        {!isLoading && <CampList campgrounds={campgrounds}></CampList>}
    </div>
}

export default Campgrounds