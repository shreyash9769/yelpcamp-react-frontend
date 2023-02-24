import { useState } from "react"

import SideDrawer from "../ui/SideDrawer"
import Backdrop from "../ui/Backdrop"
import NavLinks from "./NavLinks"
import classes from "../../styles/Navbar.module.css"
const Navbar = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState()

    const openDrawerHandler = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false)
    }

    return <div className={classes.main}>
        <h2 className={classes.h}>CampHub</h2>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className={classes.drawerNav}>
                <button className={classes.close}>X</button>
                <div className={classes.drawerNavDiv}>
                    <NavLinks />
                </div>
            </nav>
        </SideDrawer>
        <button className={classes.menubtn} onClick={openDrawerHandler}>
            <span />
            <span />
            <span />
        </button>
        <div className={classes.headerNav}>
            <NavLinks></NavLinks>
        </div>
    </div>
}

export default Navbar