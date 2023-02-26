import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import classes from "../../styles/CampItemSkeleton.module.css"

import classesItem from "../../styles/CampItem.module.css"
const CampItemSkeleton = () => {
    return Array(5).fill(0).map(() => {
        return <div className={classesItem.main}>
            <div>
                <Skeleton className={classes.img}></Skeleton>
            </div>
            <div className={classes.info}>
                <div className={classes.h2}>
                    <Skeleton width={200} height={30}></Skeleton>
                </div>
                <div className={classes.p}>
                    <Skeleton count={5}></Skeleton>
                </div>
                <Skeleton width={150} height={15}></Skeleton>
                <Skeleton width={200} height={35}></Skeleton>
            </div>
        </div>
    })

}

export default CampItemSkeleton