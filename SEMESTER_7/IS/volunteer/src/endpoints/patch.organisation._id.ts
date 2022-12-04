import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { organisationModel } from "../models";
import { patch } from "../utils/controller";
import { toMiddleware } from "../utils/toMiddleware";

const updateOrganisationSchema = toMiddleware(Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email(),
  location: Joi.object({
    city: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
  }),
  description: Joi.string().min(10).max(120),
  fullDescription: Joi.string().min(100),
  preview: Joi.string().uri(),
  galery: Joi.array().items(Joi.string().uri()),
  phoneNumber: Joi.string().min(10).max(13),
  telegram: Joi.string().min(2),
}))

patch('/organisation/:id', authUserOnly, updateOrganisationSchema, enableStatistic, async (req, res) => {
  const { id } = req.params
  const organisation = await organisationModel.findById(id)
  if (!organisation) {
    throw new HttpError(404, `Organistion with id ${id} not found`)
  }

  const { _id } = (req as any).user
  console.log(organisation.contactUser, _id);
  
  if (!_id.equals(organisation.contactUser)) {
    throw new HttpError(400, `You are not the contact user of this organisation`)
  }

  const { 
    name, 
    email, 
    location, 
    description, 
    fullDescription, 
    preview, 
    galery,
    phoneNumber,
    telegram
  } = req.body

  const orgByName = await organisationModel.findOne({ name })
  if (orgByName) {
    throw new HttpError(409, `name ${name} already taken`)
  }
  if (name) organisation.name = name

  const orgByEmail = await organisationModel.findOne({ email })
  if (orgByEmail) {
    throw new HttpError(409, `email ${email} already taken`)
  }
  if (email) organisation.email = email
  
  if (location) organisation.location = location
  if (description) organisation.description = description
  if (fullDescription) organisation.fullDescription = fullDescription
  if (preview) organisation.preview = preview
  if (galery) organisation.galery = galery
  if (phoneNumber) organisation.phoneNumber = phoneNumber
  if (telegram) organisation.telegram = telegram

  await organisation.save()

  res.json({ organisation })
})