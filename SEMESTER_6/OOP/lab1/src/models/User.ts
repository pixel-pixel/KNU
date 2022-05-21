import { model, Schema } from 'mongoose'

const User = model('users', new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}))

export default User