
import CampItem from "./CampItem"
import CampItemSkeleton from "./CampItemSkeleton"
import classes from "../../styles/CampList.module.css"


const CampList = (props) => {
    return <div className={classes.main}>
        {props.campgrounds ? props.campgrounds.map(item => <CampItem key={item._id} campId={item._id} title={item.title} description={item.description} location={item.location} price={item.price} img={item.images} src={item.images[0].url}></CampItem>
        ) : <CampItemSkeleton></CampItemSkeleton>}
    </div>
}

export default CampList