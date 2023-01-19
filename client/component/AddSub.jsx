import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AddSub = (props) => {
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [currId, setCurrId] = useState(JSON.parse(localStorage.getItem('currUser')))
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!service || !date || !price) {
      alert('Invalid entry, please try again')
      setService('')
      setDate('')
      setPrice('')
      return;
    }

    const body = {
      service,
      date,
      price,
      id: currId,
    };

    fetch('/api/addsub', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.addSub !== 'success') {
          alert('Unable to add subscription. Please try again')
          setService('')
          setDate('')
          setPrice('')
          return;
        }
        else {
          console.log('Subscription successfully saved!')
          props.onDisplaySwitch('seeSub')
          return;
        }
      })
      .catch(err => {
        console.log('Register fetch /AddSub: ERROR: ', err)
      })
  }

  return (
    <div>
      <div className="addsub-container">
        <form className="addsub-form"onSubmit={ handleSubmit }>
          <label htmlFor='service'>Subscription service:</label>
          <input type='text' name='service' id='service' value={service} onChange={(e) => setService(e.target.value)}></input>
          <label htmlFor='date'>Start date:</label>
          <input type='date' name='date' id='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
          <label htmlFor='price'>Price per month:</label>
          <input type='number' step='0.01' name='price' id='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
          <button className='log-btn'>Submit</button>
        </form>
        <button className="link-btn" onClick={() => props.onDisplaySwitch('seeSub')}>Cancel</button>
      </div>
    </div>
  )
}

export default AddSub;
