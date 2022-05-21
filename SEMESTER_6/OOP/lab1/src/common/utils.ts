import 'dotenv/config'
import { Controller, Middleware, ResReqFunc } from './types';
import { Request, Response } from 'express'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

export function controller<T extends Controller>(controller: T): T {
  for (const [key, func] of entriesOf(controller)) {

    const handled = async (req: Request, res: Response) => 
      func(req, res).catch(e => {
        console.log('ERROR:', e);
        
        res.status(400).json({ error: e.message ?? e })
      })
    controller[key] = handled as T[keyof T]
  }

  return controller
}

export const validate  = Joi.attempt

export function parseJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string, role: string }
}

function entriesOf<T extends Controller>(obj: T) {
  const keys = Object.keys(obj) as unknown as (keyof T)[]
  return keys.map(k => [k, obj[k]] as const)
}
