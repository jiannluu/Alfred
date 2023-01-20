import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Settings = (props) => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newConfPass, setNewConfPass] = useState('')
  const [currId, setCurrId] = useState(JSON.parse(localStorage.getItem('currUser')))
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem('currName')
    localStorage.removeItem('currUser')
    localStorage.setItem('userAuth', false)
    nav('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!newPass || !newConfPass) {
      alert('Password does not match. Please try again')
      setOldPass('')
      setNewPass('')
      setNewConfPass('')
      return;
    }

    const body = {
      oldPass,
      newPass,
      id: currId,
    };

    fetch('/api/changepass', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.changePass !== 'success') {
          alert('Invalid password. Please try again')
          setOldPass('')
          setNewPass('')
          setNewConfPass('')
          return;
        }
        else {
          console.log('Password successfully changed!')
          logout()
          return;
        }
      })
      .catch(err => {
        console.log('fetch /ChangePass: ERROR: ', err)
      })
  }

  return (
    <div>
      <div className="addsub-container" id="settings-container">
        <h1>Settings</h1>
        <form className="addsub-form"onSubmit={ handleSubmit }>
          <label htmlFor='oldPass'>Enter exisiting password:</label>
          <input type='password' name='oldPass' id='oldPass' value={oldPass} onChange={(e) => setOldPass(e.target.value)}></input>
          <label htmlFor='newPass'>Enter new password:</label>
          <input type='password' name='newPass' id='newPass' value={newPass} onChange={(e) => setNewPass(e.target.value)}></input>
          <label htmlFor='newConfPass'>Confirm new password:</label>
          <input type='password' name='newConfPass' id='newConfPass' value={newConfPass} onChange={(e) => setNewConfPass(e.target.value)}></input>
          <button className='log-btn'>Submit</button>
        </form>
        <button className="link-btn" onClick={() => nav(-1)}>Cancel</button>
      </div>
    </div>
  )
}

export default Settings;