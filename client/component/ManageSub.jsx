import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddSub from './AddSub.jsx'
import SeeSub from './SeeSub.jsx'

const ManageSub = () => {
  const nav = useNavigate()

  const [ userAuth, setUserAuth ] = useState(() => JSON.parse(localStorage.getItem("userAuth")))
  const [ currentDisplay, setCurrentDisplay ] = useState('seeSub')

  useEffect(() => {
    if (!userAuth) {
      nav('/login')
    }
  }, [])

  const displaySwitcher = (displayName) => {
    setCurrentDisplay(displayName)
  }

  const logout = () => {
    localStorage.removeItem('currName')
    localStorage.removeItem('currUser')
    localStorage.setItem('userAuth', false)
    nav('/login')
  }

  const goSettings = () => {
    nav('/settings')
  }

  return (
    <div className="manage-container">
      <div className="navbar addsub-navbar">
        <div id="nav-logo">
          <img id="nav-logo-img" src="https://freepngimg.com/download/suit/60271-necktie-tuxedo-bow-black-suit-tie.png"></img>
          <p id="nav-logo-word">Alfred</p>
        </div>
        <div className='nav-btns'>
            <button id="nav-logout"onClick={logout}>Log Out</button>
            <button id="nav-logout" className="nav-setting" onClick={goSettings}>&#9881;</button>
        </div>
      </div>
      {
        currentDisplay === 'addSub' ? <AddSub onDisplaySwitch={displaySwitcher}/> : <SeeSub onDisplaySwitch={displaySwitcher}/>
      }
    </div>
  )
}

export default ManageSub;
