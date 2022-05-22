import './services/initDB'
import { bot } from './services/bot'
import { maps, key } from './services/maps'
import { userStatuses } from './storage/localData'
import { StartAddressModel } from './models/StartAddress'
import { EndAddressModel } from './models/EndAddress'
import { Language, TravelMode } from '@googlemaps/google-maps-services-js'

bot.on('location', controller)
bot.on('text', controller)
bot.on(['/start', '/find'], async msg => {
  userStatuses[msg.chat.id] = { status: 'find' }
  const starts = await StartAddressModel.find({ 
    chatId: msg.chat.id
  })

  const keyboard = starts.slice(0, 5).reduce((acc, { address }) => {
    acc.push([address])
    return acc
  }, [])

  bot.sendMessage(msg.chat.id, 'Send me Your location or address or choose one from list:', {
    replyMarkup: bot.keyboard(keyboard, { resize: true, once: true })
  })
  console.log('start', keyboard);
})

type Message = { 
  chat: {
    id: string 
  },
  text: string
  location: any
}

async function controller(msg: Message) {
  switch(userStatuses[msg.chat.id]?.status) {
    case 'find': start_location(msg); break
    case 'origin': await finish_location(msg); break
    default: return
  }
}

async function start_location(msg: Message) {
  userStatuses[msg.chat.id] = {
    status: 'origin',
    data: msg.location || msg.text,
  }

  const starts = await EndAddressModel.find({ 
    chatId: msg.chat.id
  })

  const keyboard = starts.slice(0, 5).reduce((acc, { address }) => {
    acc.push([address])
    return acc
  }, [])

  bot.sendMessage(msg.chat.id, 'Send me desired location or address or choose one from list:', {
    replyMarkup: bot.keyboard(keyboard, { resize: true, once: true })
  })
}

async function finish_location(msg: Message) {
  const origin = userStatuses[msg.chat.id].data
  const destination = msg.location || msg.text

  const res = await maps.directions({
    params: {
      origin,
      destination,
      key,
      mode: TravelMode.transit,
      language: Language.uk
    }
  })



  const route = res?.data?.routes[0]
  const leg = route?.legs[0] as any
  const data = leg?.steps?.find((s: { travel_mode: string }) => s.travel_mode === 'TRANSIT')

  bot.sendMessage(msg.chat.id, 'Best way to get you location:')

  if (data) {
    await saveToDb(leg, msg.chat.id)

    const price = route?.fare?.text
    const { 
      distance: {
        text: distance_text
      }, 
      duration: {
        text: duration_text
      }, 
      html_instructions,
      transit_details: {
        line: {
          name,
          short_name,
          vehicle,
        },
        departure_time: {
          text: departure_time,
        },
        departure_stop: {
          name: departure_name,
        },
        arrival_time: {
          text: arrival_time,
        },
        arrival_stop: {
          name: arrival_name,
        },
      },
    } = data

    const title = `${vehicle.name} ${short_name}: ${name}`
    const text = `
    ${html_instructions}
    ${departure_time} ${departure_name}
    ->
    ${arrival_time} ${arrival_name}

    Ціна: ${price}
    Відстань: ${distance_text}
    Тривалість: ${duration_text}
    `

    const { lat, lng } = data.start_location
    bot.sendVenue(msg.chat.id, [lat, lng], title, departure_name)
    bot.sendMessage(msg.chat.id, text)
  } else {
    bot.sendMessage(msg.chat.id, 'There no public transport faster than walking')
  }


  delete userStatuses[msg.chat.id]
}

type Leg = { 
  start_address: string 
  end_address: string
  steps: Step[]
}

type Step = {
  travel_mode: string
}

async function saveToDb(leg: Leg, chatId: string) {
  const { 
    start_address, 
    end_address 
  } = leg

  const formatedStartAddress = formatAddress(start_address)
  const formatedEndAddress = formatAddress(end_address)

  const startCandidate = await StartAddressModel.findOne({ 
    address: formatedStartAddress,
    chatId 
  })
  const endCandidate = await EndAddressModel.findOne({
    address: formatedEndAddress
  })
  console.log('candidate', JSON.stringify(startCandidate))
  if (!startCandidate) {
    await StartAddressModel.create({
      address: formatedStartAddress,
      chatId  
    })
  }
  if(!endCandidate) {
    await EndAddressModel.create({
      address: formatedEndAddress,
      chatId
    })
  }

  // console.log('leg', JSON.stringify(leg))
}

function formatAddress(address: string) {
  const formated = address.split(',').slice(0, -3).join()
  return formated
}