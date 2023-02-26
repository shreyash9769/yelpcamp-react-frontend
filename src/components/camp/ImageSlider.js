import { useState, useEffect } from "react";

import ButtonSlider from "../ui/ButtonSlider"
import classes from "../../styles/ImageSlider.module.css"
import Skeleton from "react-loading-skeleton";
const ImageSlider = (props) => {
    const [slideIndex, setSlideIndex] = useState(0)

    const prevSlide = () => {
        if (slideIndex === 0) {
            setSlideIndex(props.images.length - 1);
        }
        else {
            setSlideIndex(slideIndex - 1)
        }
    }

    const nextSlide = () => {
        if (slideIndex === props.images.length - 1) {
            setSlideIndex(0);
        }
        else {
            setSlideIndex(slideIndex + 1)
        }
    }

    const moveDot = (index) => {
        setSlideIndex(index)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    })

    return <div className={classes.containerSlider}>
        {props.images ? props.images?.map((img, index) => {
            return <div className={slideIndex === index ? classes.slide + " " + classes.imgActive : classes.slide}>
                <img src={props.images[index].url} alt="campgroundImages"></img>
            </div>
        }) : <Skeleton className={classes.containerSlider}></Skeleton>}
        {props.images && props.images.length > 1 && <ButtonSlider moveSlide={prevSlide} direction="prev"></ButtonSlider>}
        {props.images && props.images.length > 1 && <ButtonSlider moveSlide={nextSlide} direction="next"></ButtonSlider>}
        {props.images && props.images.length > 1 && <div className={classes.containerDots}>
            {Array.from({ length: props.images.length }).map((item, index) => (
                <div
                    onClick={() => moveDot(index)}
                    className={slideIndex === index ? classes.dot + " " + classes.active : classes.dot}
                ></div>
            ))}
        </div>}
    </div>
}

export default ImageSlider