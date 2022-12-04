import { Schema, model } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    requre: true,
  },
  cartId: {
    type: String,
    requre: true,
  }
})

export default model('User', userSchema)