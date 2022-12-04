import { Request, Response, NextFunction } from 'express'
import { HttpError } from "../errors/HttpError";
import jwt from 'jsonwebtoken'
import { userModel } from '../models';

export const authUserOnly = async (req: Request , res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  const { authorization } = req.headers
  if (!authorization) {
    throw new HttpError(403, 'Authorization header not found')
  }

  const token = authorization?.split(' ')?.[1]
  if (!token) {
    throw new HttpError(403, 'Bearer token not found in authorization header')
  }

  const secret = process.env.JWT_SECRET_KEY!
  const { email } = jwt.verify(token, secret) as { email: string }
  const user = await userModel.findOne({ email })
  if (!user) {
    throw new HttpError(403, `'User with email ${email} not found`)
  }

  (req as any).user = user

  next()
}