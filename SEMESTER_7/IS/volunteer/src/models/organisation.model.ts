import mongoose, { Schema } from "mongoose";

const organisationSchema = new Schema({
  name: String,
  email: String,
  location: {
    city: String,
    address: String,
  },
  description: String,
  fullDescription: String,
  preview: String,
  galery: [String],
  phoneNumber: String,
  telegram: String,
  created: { type: Date, default: Date.now() },
  createdEvents: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
  contactUser: { type: mongoose.Types.ObjectId, ref: 'User' },
})

export const organisationModel = mongoose.model('Organisation', organisationSchema)