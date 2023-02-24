import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"

import classes from "../../styles/ImageSlider.module.css"

const ButtonSlider = (props) => {
    return <button onClick={props.moveSlide}>
        {props.direction === "next" ? <BsFillArrowRightCircleFill className={classes.btnSlide + " " + classes.next} /> : <BsFillArrowLeftCircleFill className={classes.btnSlide + " " + classes.prev} />}
    </button>
}

export default ButtonSlider