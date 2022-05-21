import React, { useState } from "react";

export function Card({ bank, number, date, cv, blocked, image }) {
  const [ error, setError ] = useState()

  const buttonText = blocked ? 'Unblock' : 'Block'

  const blockUnblock = async() => {
    const url = blocked ? 'unblock' : 'block'
    const token = localStorage.getItem('TOKEN')
    const res = await fetch(`http://localhost:3001/cards/${url}`, {
      method: 'POST',
      body: JSON.stringify({
        number,
        date,
        cv
      }),
      headers: {
        'Authorization': `TOKEN ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const body = await res.json()

    if (body.error) {
      setError(body.error)
      return
    }

    console.log('card block', body);
  }

  return (
    <div className="card">
      <p className="error">{error || bank}</p>
      <div className="card-data">
        <p>{number}</p>
        <p>{date}</p>
        <p>{cv}</p>
      </div>
  
      <button 
        className="card-button"
        onClick={blockUnblock}>{buttonText}</button>
      
    </div>
  )
}