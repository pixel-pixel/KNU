import Joi from "joi";
import { HttpError } from "../errors/HttpError";
import { ControllerFunc } from "./controller";

export const toMiddleware = (schema: Joi.Schema): ControllerFunc => async (req, res, next) => {
  const { body } = req
  const { error } = schema.validate(body)
  if (error) {
    throw new HttpError(400, error)
  }

  next()
}