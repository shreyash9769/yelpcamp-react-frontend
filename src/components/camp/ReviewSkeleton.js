import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import classes from "../../styles/ReviewSkeleton.module.css"
const ReviewSkeleton = () => {
    return Array(2).fill(0).map((_, index) => {
        return <div key={index} className={classes.main}>
            <div className={classes.name}>
                <Skeleton baseColor="#333" width={180} height={20}></Skeleton>
            </div>
            <div className={classes.p}>
                <Skeleton count={3} height={12}></Skeleton>
            </div>
        </div>
    })
}

export default ReviewSkeleton