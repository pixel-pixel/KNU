import React, { useState } from "react";

export function NewCard() {
  const [ bank, setBank ] = useState()
  const [ number, setNumber ] = useState()
  const [ date, setDate ] = useState() 
  const [ cv, setCv ] = useState()
  const [ error, setError ] = useState()

  const create = async() => {
    const token = localStorage.getItem('TOKEN')
    const res = await fetch('http://localhost:3001/cards/create', {
      method: 'POST',
      body: JSON.stringify({
        bank, number, date, cv
      }),
      headers: {
        'Authorization': `TOKEN ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const body = await res.json()

    setError(body.error)


    console.log('card', body);
  }

  return (
    <div className="card">
      <img 
        className="card-image"
        src="https://ubanks.com.ua/img/bank-logo/monobank-logo.png" />
      <p className="error">{error || 'New card'}</p>

      <div>
        <input 
          className="card-input"
          placeholder="bank" 
          value={bank} 
          onChange={e => setBank(e.target.value)} />
        <input 
          className="card-input"
          placeholder="number" 
          value={number} 
          onChange={e => setNumber(e.target.value)} />
        <input 
          className="card-input"
          placeholder="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} />
        <input 
          className="card-input"
          placeholder="cv" 
          value={cv} 
          onChange={e => setCv(e.target.value)} />
      </div>

      <button 
        className="card-button"
        onClick={create}>Create</button>
    </div>
  )
}