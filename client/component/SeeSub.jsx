import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TableRow from './TableRow.jsx';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const SeeSub = (props) => {
  const [ currSubs, setCurrSubs ] = useState([])
  const [currId, setCurrId] = useState(JSON.parse(localStorage.getItem('currUser')))
  const [ totalPrice, setTotalPrice ] = useState()

  useEffect(() => {
    fetch(`/api/getsub/${currId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON'
      },
    })
      .then(res => res.json())
      .then(data => {
        //stores data in our curr state
        setCurrSubs(data);

        //grab total price spent per month on subs
        let totalSpend = 0;
        for (let i = 0; i < data.length; i++) {
          totalSpend += parseFloat(data[i].price);
        }
        setTotalPrice(totalSpend.toFixed(2));
      })

      .catch(err => {
        console.log('fetch /SeeSub: ERROR: ', err)
      })
  }, [currSubs])

  const data = {
    labels: currSubs.map(element => element.name),
    datasets: [
      {
        label: 'Price',
        data: currSubs.map(element => element.price),
        backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
        ],
        borderWidth: 0,
      }
    ]
  }

  return (
    <div>
      <div className='bef-table'>
        <p className="spending-txt">Total monthly spending: <span className="price-txt">${totalPrice}</span></p>
        <div className="chart-container">
          <Doughnut data={data} />
        </div>
      </div>
      <button className="addsub-btn" onClick={() => props.onDisplaySwitch('addSub')}>Add Subscription</button>
      <table className="sub-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currSubs.map((element, index) => <TableRow item={element} />)}
        </tbody>
      </table>
    </div>
  )
}

export default SeeSub;