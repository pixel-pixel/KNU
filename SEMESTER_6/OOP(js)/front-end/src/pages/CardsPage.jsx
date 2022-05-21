import React, { useEffect, useState } from "react";
import { Card } from "../components/Crad";
import { NewCard } from "../components/NewCard";

export function CardsPage() {
  const [ error, setError ] = useState()
  const [ cards, setCards ] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    const f = async() => {
      const res = await fetch('http://localhost:3001/cards/mine', {
        method: 'GET',
        headers: {
          'Authorization': `TOKEN ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const body = await res.json()

      if (body.error) {
        console.log(body.error);
        setError(body.error)
        return
      }

      setCards(body)
    }
    f()

  }, [cards, error])

  const Cards = cards.map(data => <Card {...data} />)

  return (
    <div>
      {
      error 
      ? <p className="error">{error}</p>
      : <div className="card-container">
          {Cards}
          <NewCard /> 
        </div>
      }
    </div>
  )
}