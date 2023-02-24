import React from "react"
import { Link } from "react-router-dom"

import classes from "../../styles/CampInfo.module.css"
const CampInfo = (props) => {
    return <div className={classes.main}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p className={classes.loc}>{props.location}</p>
        <Link to={`/campground/${props.campId}`}><button className={classes.btn}>View {props.title}</button></Link>
    </div>
}

export default CampInfo