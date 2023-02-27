import { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../camp/auth-context"
import ErrorModal from "../ui/ErrorModal"
import LoadingSpinner from "../ui/LoadingSpinner"

import classes from "../../styles/Login.module.css"
const Login = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [enteredEmail, setEnteredEmail] = useState();
    const [enteredPassword, setEnteredPassword] = useState();
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value)
    }

    const clearError = () => {
        setError(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: "POST",
                body: JSON.stringify({
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
            setIsLoading(false)
            toast.success("Welcome back")
            if (location.state?.pushed) {
                navigate("/")
            }
            else
                navigate(-1)
        }
        catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    return <>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <div className={classes.main}>
            <p className={classes.login}>Login</p>
            <div>
                <img className={classes.img} src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" alt="login"></img>
            </div>
            <form onSubmit={submitHandler} className={classes.form}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={emailChangeHandler} value={enteredEmail}></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={passwordChangeHandler} value={enteredPassword}></input>
                <button className={classes.submit}>Login</button>
                <p>Don't have an account? <a href="/signup">Signup</a></p>
            </form>
        </div>
    </>
}

export default Login