import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
  name: String,
  useCount: { type: Number, default: 0 },
})

export const tagModel = mongoose.model('Tag', tagSchema)