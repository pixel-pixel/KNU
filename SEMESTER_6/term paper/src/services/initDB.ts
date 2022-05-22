import 'dotenv/config'
import mongoose from 'mongoose'

const { 
  DB_USER, 
  DB_PASSWORD, 
  DB_NAME 
} = process.env

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gajzw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  ).then(() => {
    console.log('DB connected!')
  })