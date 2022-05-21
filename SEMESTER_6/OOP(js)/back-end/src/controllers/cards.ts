import { parseJWT, validate } from "../common/utils";
import { controller } from "../common/utils";
import Card from "../models/Card";
import { blockUnblockCardSchema, createCardSchema } from "../validation/card";

const cards = controller({

  async getAllMine(req, res) {
    const token = req.headers.authorization?.split(' ')[1]
    const { _id } = parseJWT(token as string)

    const cards = await Card.find({ user_id: _id })
    res.status(200).json(cards)
  },

  async getAllBlocked(req, res) {
    const cards = await Card.find({ blocked: true })
    res.status(200).json(cards)
  },
  
  async create(req, res) {
    const token = req.headers.authorization?.split(' ')[1]
    const { _id } = parseJWT(token as string)

    const card = validate(req.body, createCardSchema)
    const candidate = await Card.findOne({ number: card.number })
    if (candidate) throw 'Card with this number already exist'

    await Card.create({ 
      ...card,
      blocked: false,
      user_id: _id,
    })
    res.status(200).json({ ...card, blocked: false })
  },

  async block(req, res) {
    const token = req.headers.authorization?.split(' ')[1]
    const { _id } = parseJWT(token as string)

    const card = validate(req.body, blockUnblockCardSchema)
    const candidate = await Card.findOne({ 
      ...card,
      user_id: _id,
    })
    if (!candidate) throw 'Card not found'

    candidate.blocked = true
    await candidate.save()
    res.status(200).json(candidate)
  },

  async unblock(req, res) {
    const card = validate(req.body, blockUnblockCardSchema)
    const candidate = await Card.findOne({ 
      ...card
    })
    if (!candidate) throw 'Card not found'

    candidate.blocked = false
    await candidate.save()
    res.status(200).json(candidate)
  }

})

export default cards