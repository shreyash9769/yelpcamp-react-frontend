import { useNavigate } from "react-router-dom"

import classes from "../../styles/Welcome.module.css"

const WelcomePage = () => {
    const navigate = useNavigate()
    const submitHandler = () => {
        navigate("/campgrounds")
    }
    return <div className={classes.main}>
        <h1>CampHub</h1>
        <div className={classes.p}>
            <p>Welcome to CampHub!<br></br>
                Jump right in and explore our many campgrounds.<br></br>
                Feel free to share some of your own and comment on others!</p>

        </div>
        <button className={classes.btn} onClick={submitHandler}>View Campgrounds</button>
        <p className={classes.footer}>&copy;2022 SHREYASH ADLINGE</p>
    </div>
}

export default WelcomePage