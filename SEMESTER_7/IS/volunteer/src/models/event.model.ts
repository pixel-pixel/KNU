import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  title: String,
  description: String,
  organisation: {
    type: mongoose.Types.ObjectId,
    ref: 'Organisation'
  },
  fullDescription: String,
  img: String,
  created: { type: Date, default: Date.now() },
  deadline: Date,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  hours: Number,
  workType: String, 
  requirements: String,
  tasks: [String],
  age: Number,
  contactEmail: String,
  contactPhoneNumber: String,
  salary: { type: Number, default: 0 },
  subscribers: [{
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    hours: {
      type: Number
    },
  }],
  isModerated: { type: Boolean, default: false },
})

export const eventModel = mongoose.model('Event', eventSchema)