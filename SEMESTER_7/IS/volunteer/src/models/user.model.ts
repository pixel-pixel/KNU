import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  email: String,
  hashedPassword: String,
  firstName: String,
  lastName: String,
  age: Number,
  sex: String,
  phoneNumber: String,
  location: {
    city: String,
    address: String,
  },
  partisipations: [{
    event: { type: mongoose.Types.ObjectId, ref: 'Event' },
    hours: Number
  }]
})

export const userModel = mongoose.model('User', userSchema)