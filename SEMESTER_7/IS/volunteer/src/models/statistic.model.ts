import mongoose, { Schema } from "mongoose"

const statisticSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  method: String,
  originalUrl: String,
  body: Object,
  params: Object,
  date: {
    type: Date,
    default: Date.now()
  },
})

export const statisticModel = mongoose.model('Statistic', statisticSchema)