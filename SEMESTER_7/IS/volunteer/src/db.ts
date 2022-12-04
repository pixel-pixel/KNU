import mongoose from 'mongoose'

const connection = process.env.DB_CONNECTION_STRING!

mongoose.connect(connection)
  .then(() => console.log('💾 DB connected!'))

