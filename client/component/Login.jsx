import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      alert('Invalid entry, please try again')
      setEmail('')
      setPassword('')
      return;
    }

    const body = {
      email,
      password
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.login !== 'success') {
          alert('Invalid email/password. Please try again')
          setEmail('')
          setPassword('')
          return;
        }
        else {
          console.log('Log in successful!')
          localStorage.setItem('currName', data.firstName)
          localStorage.setItem('currUser', data.id)
          localStorage.setItem('userAuth', true)
          nav('/')
        }
      })
      .catch(err => {
        console.log('Register fetch /signup: ERROR: ', err)
      })
  }

  return (
    <div>
      <div id="logo">
        <img id="logo-img" src="https://freepngimg.com/download/suit/60271-necktie-tuxedo-bow-black-suit-tie.png"></img>
        <p id="logo-word">Alfred</p>
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={ handleSubmit }>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button className='log-btn'>Log In</button>
        </form>
        <button onClick={() => props.onFormSwitch('signup')} className="link-btn">Don't have an account? Sign up here</button>
      </div>
    </div>
  )
}

export default Login
