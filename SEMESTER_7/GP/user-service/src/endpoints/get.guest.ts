import { get, post } from "../utils/controller"
import jwt from "jsonwebtoken"
import { v4 as uuid } from "uuid"

get('/users/guest', async (req, res) => {
  const dataForTokenize = { 
    role: 'GUEST',
    cart_id: uuid()
  }
  const secret = process.env.JWT_SECRET_KEY!
  const token = jwt.sign(dataForTokenize, secret)

  res.json({ token })
})