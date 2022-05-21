import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

import auth from './controllers/auth'
import users from './controllers/users'
import cards from './controllers/cards'

import { authorized } from './middlewares/authorized'
import cors from 'cors'


const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())


app.post('/register', auth.register)
app.post('/login', auth.login)
app.get('/users', authorized('ADMIN'), users.getAll)
app.get('/cards/mine', authorized('USER'), cards.getAllMine)
app.get('/cards/blocked', authorized('ADMIN'), cards.getAllBlocked)
app.post('/cards/create', authorized('USER'), cards.create)
app.post('/cards/block', authorized('USER'), cards.block)
app.post('/cards/unblock', authorized('ADMIN'), cards.unblock)


//Run server
app.listen(PORT, async () => {
  const { DB_USER, DB_PASSWORD, DB_NAME } = process.env
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gajzw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  console.log('Server started!')
})