import { model, Schema } from 'mongoose'

const Card = model('cards', new Schema({
  number: { type: String, required: true },
  date: { type: String, required: true },
  cv: { type: String, required: true },

  bank: { type: String, required: true },
  image: { type: String, required: true },

  blocked: { type: Boolean, required: true },
  user_id: { type: String, required: true },
}))

export default Card