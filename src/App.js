import React, { useState, useCallback, useEffect } from 'react';
import { Route, Navigate, Routes } from "react-router-dom"
import { SkeletonTheme } from 'react-loading-skeleton'

import { AuthContext } from './components/camp/auth-context';
import NewCampgroundForm from './components/forms/NewCampgroundForm';
import SingleCampground from './components/camp/SingleCampground';
import Login from './components/forms/Login';
import Signup from "./components/forms/Signup"
import Campgrounds from './components/camp/Campgroungs';
import WelcomePage from './components/camp/WelcomePage';
import EditCampground from './components/forms/EditCampground';
import Navbar from './components/camp/Navbar';

import './App.css';


function App() {
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()

  const login = useCallback((userId, token) => { //useCallback is used bcoz we do not want this func to render again and again
    setUserId(userId)
    setToken(token)
    localStorage.setItem("userData", JSON.stringify({ userId, token }))
  }, [])

  const logout = useCallback(() => {
    setUserId(null)
    setToken(null)
    localStorage.removeItem("userData")
  }, [])

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("userData")) //When receiving data from a web server, the data is always a string.
    //with JSON.parse(), the data becomes a JavaScript object.
    if (storage && storage.token) {
      login(storage.userId, storage.token)
    }
  }, [login])

  //switch is used so that exactly one route is matched. eg 1 <Route path="/prod"> 2 <Route path="/prod/new">. 
  //Suppose if we remove switch and there are above 2 routes, in this case both routes will be matched and pages inside both routes
  //will be displayed bcoz path is matched frm start so /prod is present is both so both routes are matched therefore switch is used
  //so that only one route is matched. But there is still a prb suppose in browser we enter /prod/new instead of displaying pgs in this
  //route pgs in /prod route will be displayed bcoz /prod route is first and as discussed abv a path is matched frm start therefore we need 
  //to specify exact keyword in /prod route 
  //Note exact is not needed in latest update and Switch is replaced by Routes
  let routes
  if (token) {
    routes = <Routes>
      <Route path='/' element={<WelcomePage></WelcomePage>}>
      </Route>
      <Route path='/campgrounds' element={<Campgrounds></Campgrounds>}>
      </Route>
      <Route path='/campground/new' element={<NewCampgroundForm></NewCampgroundForm>}>
      </Route>
      <Route path='/campground/:campId' element={<SingleCampground></SingleCampground>}>
      </Route>
      <Route path="/campground/:campId/edit" element={<EditCampground></EditCampground>}>
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  }
  else {
    routes = <Routes>
      <Route path='/' element={<WelcomePage></WelcomePage>}>
      </Route>
      <Route path='/campgrounds' element={<Campgrounds></Campgrounds>}>
      </Route>
      <Route path='/campground/:campId' element={<SingleCampground></SingleCampground>}>
      </Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route
        path="*"
        element={<Navigate to="/login" replace state={{ pushed: true }} />}
      />

    </Routes>
  }

  return (
    <AuthContext.Provider value={{ userId, token, isLoggedIn: !!token, login, logout }}>
      <Navbar></Navbar>
      <SkeletonTheme baseColor="#e0dcdc" highlightColor="#c2c2c2">
        {routes}
      </SkeletonTheme>
    </AuthContext.Provider>
  );
}

export default App;
