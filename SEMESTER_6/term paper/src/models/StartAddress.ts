import { model, Schema } from 'mongoose'

const StartAddressSchema = new Schema({
  chatId: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  }
})

const StartAddressModel = model(
  'departures', 
  StartAddressSchema
)

export { StartAddressModel }