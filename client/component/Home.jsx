import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const Home = () => {
  const nav = useNavigate()

  const [ userAuth, setUserAuth ] = useState(() => JSON.parse(localStorage.getItem("userAuth")))
  const [ userName, setUserName ] = useState(() => localStorage.getItem('currName'))

  //dynamically change welcome message based on user's time of day
  const date = new Date()
  const currHr = date.getHours()
  let welcome;

  if (currHr < 12) {
    welcome = 'Good Morning'
  } else if (currHr < 18) {
    welcome = 'Good Afternoon'
  } else {
    welcome = 'Good Evening'
  }

  useEffect(() => {
    if (!userAuth) {
      nav('/login')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('currName')
    localStorage.removeItem('currUser')
    localStorage.setItem('userAuth', false)
    nav('/login')
  }

  const managesub = () => {
    nav('/managesub')
  }

  const goSettings = () => {
    nav('/settings')
  }


  return (
    <div className="home-container">
        <div className="navbar">
          <div id="nav-logo">
            <img id="nav-logo-img" src="https://freepngimg.com/download/suit/60271-necktie-tuxedo-bow-black-suit-tie.png"></img>
            <p id="nav-logo-word">Alfred</p>
          </div>
          <div className='nav-btns'>
            <button id="nav-logout"onClick={logout}>Log Out</button>
            <button id="nav-logout" className="nav-setting" onClick={goSettings}>&#9881;</button>
          </div>
        </div>
        <div className="homebody-container">
          <p id="welcome">{`${welcome}, ${userName}`}</p>
          <div className="manage">
            <button className="manage-btn" onClick={managesub}>Click here</button><p>to start managing your subscriptions</p>
          </div>
        </div>
    </div>
  )
}

export default Home
