import { model, Schema } from 'mongoose'

const EndAddressSchema = new Schema({
  chatId: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  }
})

const EndAddressModel = model(
  'arrivals', 
  EndAddressSchema
)

export { EndAddressModel }