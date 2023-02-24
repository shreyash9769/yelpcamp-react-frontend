import React from "react"

import CampgroundImg from "./CampgroundImg"
import CampInfo from "./CampInfo"

import classes from "../../styles/CampItem.module.css"

const CampItem = (props) => {
    return <div className={classes.main}>
        <CampgroundImg img={props.src}></CampgroundImg>
        <CampInfo campId={props.campId} title={props.title} description={props.description} location={props.location} price={props.price}></CampInfo>
    </div>
}

export default CampItem