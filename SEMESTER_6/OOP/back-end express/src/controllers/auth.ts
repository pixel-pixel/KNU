import 'dotenv/config'
import { controller, validate } from '../common/utils';
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { registerUserSchema, loginUserSchema } from '../validation/user';

const auth = controller({
  
  async register(req, res) {
    const { username, password, role } = validate(req.body, registerUserSchema)    
    
    const candidate = await User.findOne({ username })
    if (candidate) throw `Username '${username}' already taken!`
    
    const hashedPassword = bcrypt.hashSync(password, 7)
    const { _id } = await User.create({ username, password: hashedPassword, role })
    const token = jwt.sign(
      { _id, role }, 
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' },
    )

    res.status(200).json({ token, role })
  },

  async login(req, res) {
    const { username, password } = validate(req.body, loginUserSchema)    
    
    const candidate = await User.findOne({ username })
    if (!candidate) throw `Username '${username}' not found!`
    
    const validPassword = bcrypt.compare(password, candidate.password)
    if (!validPassword) throw 'Bad password :('

    const { _id, role } = candidate
    const token = jwt.sign(
      { _id, role }, 
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' },
    )

    res.status(200).json({ token, role })
  }
  
})

export default auth