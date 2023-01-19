import React, { Component, useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const TableRow = (props) => {

  console.log(confirmAlert)

  const deleteMySub = () => {
    confirmAlert({
      title: 'Deleting Subscription',                        
      message: `Did you cancel your membership at ${props.item.name}?`,          
      buttons: [
        {
          label: 'Yes',
          onClick: deleteSub
        },
        {
          label: 'No',
          onClick: () => alert('Cancel your membership first!')
        }
      ],
    })
  };

  const deleteSub = () => {
    fetch(`/api/deletesub/${props.item._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON'
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.deleteSub !== success) {
          console.log('Something went wrong. Unable to delete')
        }
        else {
          console.log('Successfully deleted')
        }
      })
      .catch(err => {
        console.log('fetch /SeeSub: ERROR: ', err)
      })
  }

  return (
    <tr>
      <td>{props.item.name}</td>
      <td>{props.item.start_date}</td>
      <td>${props.item.price}</td>
      <td><button className="deletesub-btn" onClick={ deleteMySub }>&#128465;</button></td>
    </tr>
  )
}

export default TableRow;
