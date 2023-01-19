/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const formSwitcher = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ? <Login onFormSwitch={formSwitcher}/> : <Register onFormSwitch={formSwitcher}/>
      }
    </div>
  )
}

export default App
