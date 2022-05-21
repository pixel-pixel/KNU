import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const register = async() => {
    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        role: 'USER'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body = await res.json()
    setError(body.error)

    if (!body.token) return
    localStorage.setItem('TOKEN', body.token)
    console.log('token', body.token)

    if (body.role == 'USER') navigate('/cards')
    else navigate('/admin')
  }

  const login = async() => {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body = await res.json()
    setError(body.error)

    if (!body.token) return
    localStorage.setItem('TOKEN', body.token)
    console.log('token', body.token)

    if (body.role == 'USER') navigate('/cards')
    else navigate('/admin')
  }


  return (
    <div className="authBlock">
      <h6 className="title">My App</h6>

      <input 
        className="input"
        placeholder="username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} />
      <input 
        className="input"
        placeholder="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      
      <div>
        <button 
          className="button"
          onClick={register}>register</button>
        <button 
          className="button"
          onClick={login}>login</button>
      </div>
    </div>
  )
}