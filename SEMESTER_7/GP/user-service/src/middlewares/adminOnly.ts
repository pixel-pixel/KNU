import { Request, Response, NextFunction } from 'express'
import { HttpError } from "../errors/HttpError";
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel';

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
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
  const { username } = jwt.verify(token, secret) as { username: string }
  const findedUser = await userModel.findOne({ username })
  if (!findedUser) {
    throw new HttpError(403, `'User with username ${username} not found`)
  }


  if (findedUser.role !== 'ADMIN') {
    throw new HttpError(403, 'User role must be Admin')
  }

  next()
}