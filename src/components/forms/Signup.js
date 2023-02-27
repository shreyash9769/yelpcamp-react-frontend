import { useState, useContext } from "react"
import { toast } from "react-toastify"

import ErrorModal from "../ui/ErrorModal"
import LoadingSpinner from "../ui/LoadingSpinner"
import { AuthContext } from "../camp/auth-context"

import classes from "../../styles/Login.module.css"

const Signup = () => {
    const auth = useContext(AuthContext)
    const [enteredName, setEnteredName] = useState();
    const [enteredEmail, setEnteredEmail] = useState();
    const [enteredPassword, setEnteredPassword] = useState();
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()

    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value)
    }

    const clearError = () => {
        setError(false)
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: "POST",
                body: JSON.stringify({ //you have to enter name:enteredName like this bcoz enteredName does not match the property name on backend 
                    name: enteredName,
                    email: enteredEmail,
                    password: enteredPassword
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            auth.login(responseData.user._id, responseData.token)
            toast.success("Registered Successfully. Its time to explore our campgrounds")
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    return <div className={classes.main}>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <p className={classes.login}>Signup</p>
        <div>
            <img className={classes.img} src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" alt="login"></img>
        </div>
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={nameChangeHandler} value={enteredName}></input>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={emailChangeHandler} value={enteredEmail}></input>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={passwordChangeHandler} value={enteredPassword}></input>
            <button className={classes.submit}>Signup</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>
    </div>
}

export default Signup