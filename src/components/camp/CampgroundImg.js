import React from "react"

import classes from "../../styles/CampgroundImg.module.css"
const CampgroundImg = (props) => {
    return <div className={classes.main}>
        <img className={classes.img} src={props.img} alt="Campground"></img>
    </div>
}

export default CampgroundImg