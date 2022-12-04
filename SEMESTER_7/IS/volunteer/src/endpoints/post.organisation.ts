import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { organisationModel } from "../models";
import { post } from "../utils/controller";
import { toMiddleware } from "../utils/toMiddleware";

const createOrganisationSchema = toMiddleware(Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  location: Joi.object({
    city: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
  }).required(),
  description: Joi.string().min(10).max(120).required(),
}))

post('/organisation/', authUserOnly, createOrganisationSchema, enableStatistic, async (req, res) => {
  const { body, user } = req as any

  const { name } = body
  const orgByName = await organisationModel.findOne({ name })
  if (orgByName) {
    throw new HttpError(409, `name ${name} already taken`)
  }

  const { email } = body
  const orgByEmail = await organisationModel.findOne({ email })
  if (orgByEmail) {
    throw new HttpError(409, `email ${email} already taken`)
  }

  const { location, description } = body
  const { _id } = user
  const { _id: orgId } = await organisationModel.create({
    name,
    email,
    location,
    description,
    contactUser: _id
  })
  const organisation = await organisationModel.findById(orgId, { __v: 0 })

  res.json({ organisation })
})