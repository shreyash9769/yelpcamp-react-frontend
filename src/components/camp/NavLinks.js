import { useContext } from "react"
import { NavLink } from "react-router-dom"

import { AuthContext } from "./auth-context"

import classes from "../../styles/NavLinks.module.css"
const NavLinks = () => {
    const auth = useContext(AuthContext)
    return <div className={classes.nav}>
        <ul className={classes.ul}>
            <NavLink to="/" className={({ isActive }) => isActive ? classes.active : classes.inactive}><li>Home</li></NavLink>
            <NavLink to="/campgrounds" className={({ isActive }) => isActive ? classes.active : classes.inactive}><li>Campgrounds</li></NavLink>
            {!auth.isLoggedIn && <NavLink to="/login" className={() => classes.inactive}><li>Add Campground</li></NavLink>}
            {auth.isLoggedIn && <NavLink to="/campground/new" className={({ isActive }) => isActive ? classes.active : classes.inactive}><li>Add Campground</li></NavLink>}
            {!auth.isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? classes.active : classes.inactive}><li>Login</li></NavLink>}
            {!auth.isLoggedIn && <NavLink to="/signup" className={({ isActive }) => isActive ? classes.active : classes.inactive}><li>Signup</li></NavLink>}
            {auth.isLoggedIn && <NavLink to="/logout" className={({ isActive }) => isActive ? classes.active : classes.inactive} onClick={auth.logout}><li>Logout</li></NavLink>}
        </ul>
    </div>
}

export default NavLinks