

const EndAddressModel = model('arrivals', new Schema({
  chatId: { type: String, required: true },
  address: { type: String, required: true }
}))

export {
  StartAddressModel,
  EndAddressModel
}