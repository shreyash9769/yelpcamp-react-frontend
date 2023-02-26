import { useState, useEffect } from "react"
import CampList from "./CampList"
import DisplayMap from "../map/DisplayMap"

import classes from "../../styles/Campgrounds.module.css"

const Campgrounds = props => {
    const [campgrounds, setCampgrounds] = useState()

    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/campgrounds`, { method: "GET" })
                const responseData = await response.json()
                setCampgrounds(responseData)
            }
            catch (err) {

            }
        }
        fetchCampgrounds()
    }, [])
    return <div className={classes.main}>
        <DisplayMap cityData={campgrounds}></DisplayMap>
        <h1>All Campgrounds</h1>
        <CampList campgrounds={campgrounds}></CampList>
    </div>
}

export default Campgrounds