import 'dotenv/config'
import { Client } from '@googlemaps/google-maps-services-js'

const maps = new Client({});
const key = process.env.GOOGLE_SEKRET_KEY || ''

export {
  maps,
  key,
}