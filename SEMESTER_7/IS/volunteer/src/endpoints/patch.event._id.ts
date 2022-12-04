import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { authUserOnly } from "../middlewares/adminOnly";
import { enableStatistic } from "../middlewares/enableStatistic";
import { eventModel, organisationModel, tagModel } from "../models";
import { patch } from "../utils/controller";
import { toMiddleware } from "../utils/toMiddleware";

const createEventSchema = toMiddleware(Joi.object({
  title: Joi.string().min(4),
  description: Joi.string().min(50),
  fullDescription: Joi.string().min(100),
  img: Joi.string().uri(),
  deadline: Joi.string().isoDate(),
  hours: Joi.number().positive(),
  workType: Joi.string(),
  requirements: Joi.string(),
  tasks: Joi.array().items(Joi.string()),
  age: Joi.number().positive(),
  contactEmail: Joi.string().email(),
  contactPhoneNumber: Joi.string().min(10).max(13),
  salary: Joi.number().positive(),
  tags: Joi.array().items(Joi.string().min(10))
}))

patch('/event/:id', authUserOnly, createEventSchema, enableStatistic, async (req, res) => {
  const { id } = req.params
  const event = await eventModel.findById(id)
  if (!event) {
    throw new HttpError(404, `Event with id ${id} not found`)
  }

  const organisation = await organisationModel.findById(event.organisation)
  if (!organisation) {
    throw new HttpError(400, `Bad organisation in event`)
  }

  const { _id } = (req as any).user
  if (!_id.equals(organisation.contactUser)) {
    throw new HttpError(400, `You are not the contact user of this organisation`)
  }

  const {
    title,
    description,
    fullDescription,
    img,
    deadline,
    hours,
    workType,
    requirements,
    tasks,
    age,
    contactEmail,
    contactPhoneNumber,
    salary,
    tags,
  } = req.body

  if (title) event.title = title
  if (description) event.description = description
  if (fullDescription) event.fullDescription = description
  if (img) event.img = img
  if (deadline) event.deadline = deadline
  if (hours) event.hours = hours
  if (workType) event.workType = workType
  if (requirements) event.requirements = requirements
  if (tasks) event.tasks = tasks
  if (age) event.age = age
  if (contactEmail) event.contactEmail = contactEmail
  if (contactPhoneNumber) event.contactPhoneNumber
  if (salary) event.salary = salary

  if (tags) {
    await Promise.all(tags.map(async (id: string) => {
      const taskById = await tagModel.findById(id)
      if (!taskById) throw new HttpError(404, `Tag with id ${id} not found`)
      taskById.useCount++
      await taskById.save()
    }))
    event.tags = tags
  }

  await event.save()
  res.json({ event })
})
