/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { useState, useEffect } from 'react'

const Register = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPass) {
      alert('Password does not match! Please check your password')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPass('')
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPass) {
      alert('Invalid entry, please try again')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPass('')
      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      password
    };

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.signup !== 'success') {
          alert('You are already registered. Please sign in')
          props.onFormSwitch('login')
        }
        else {
          console.log('Sign up successful!')
          props.onFormSwitch('login')
        }
      })
      .catch(err => {
        console.log('Login fetch /login: ERROR: ', err)
      })
  }

  return (
    <div className='signup-container'>
      <form className="signup-form" onSubmit={ handleSubmit }>
        <label htmlFor='firstName'>First name:</label>
        <input type='text' name='firstName' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
        <label htmlFor='lastName'>Last name:</label>
        <input type='text' name='lastName' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <label htmlFor='confirmPass'>Confirm your password:</label>
        <input type='password' name='confirmPass' id='confirmPass' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}></input>
        <button className='log-btn'>Confirm</button>
      </form>
        <button onClick={() => props.onFormSwitch('login')} className="link-btn">Cancel</button>
    </div>
  )
}

export default Register
