"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./services/initDB");
const bot_1 = require("./services/bot");
const maps_1 = require("./services/maps");
const localData_1 = require("./storage/localData");
const StartAddress_1 = require("./models/StartAddress");
const EndAddress_1 = require("./models/EndAddress");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
bot_1.bot.on('location', controller);
bot_1.bot.on('text', controller);
bot_1.bot.on(['/start', '/find'], async (msg) => {
    localData_1.userStatuses[msg.chat.id] = { status: 'find' };
    const starts = await StartAddress_1.StartAddressModel.find({
        chatId: msg.chat.id
    });
    const keyboard = starts.slice(0, 5).reduce((acc, { address }) => {
        acc.push([address]);
        return acc;
    }, []);
    bot_1.bot.sendMessage(msg.chat.id, 'Send me Your location or address or choose one from list:', {
        replyMarkup: bot_1.bot.keyboard(keyboard, { resize: true, once: true })
    });
    console.log('start', keyboard);
});
async function controller(msg) {
    switch (localData_1.userStatuses[msg.chat.id]?.status) {
        case 'find':
            start_location(msg);
            break;
        case 'origin':
            await finish_location(msg);
            break;
        default: return;
    }
}
async function start_location(msg) {
    localData_1.userStatuses[msg.chat.id] = {
        status: 'origin',
        data: msg.location || msg.text,
    };
    const starts = await EndAddress_1.EndAddressModel.find({
        chatId: msg.chat.id
    });
    const keyboard = starts.slice(0, 5).reduce((acc, { address }) => {
        acc.push([address]);
        return acc;
    }, []);
    bot_1.bot.sendMessage(msg.chat.id, 'Send me desired location or address or choose one from list:', {
        replyMarkup: bot_1.bot.keyboard(keyboard, { resize: true, once: true })
    });
}
async function finish_location(msg) {
    const origin = localData_1.userStatuses[msg.chat.id].data;
    const destination = msg.location || msg.text;
    const res = await maps_1.maps.directions({
        params: {
            origin,
            destination,
            key: maps_1.key,
            mode: google_maps_services_js_1.TravelMode.transit,
            language: google_maps_services_js_1.Language.uk
        }
    });
    const route = res?.data?.routes[0];
    const leg = route?.legs[0];
    const data = leg?.steps?.find((s) => s.travel_mode === 'TRANSIT');
    bot_1.bot.sendMessage(msg.chat.id, 'Best way to get you location:');
    if (data) {
        await saveToDb(leg, msg.chat.id);
        const price = route?.fare?.text;
        const { distance: { text: distance_text }, duration: { text: duration_text }, html_instructions, transit_details: { line: { name, short_name, vehicle, }, departure_time: { text: departure_time, }, departure_stop: { name: departure_name, }, arrival_time: { text: arrival_time, }, arrival_stop: { name: arrival_name, }, }, } = data;
        const title = `${vehicle.name} ${short_name}: ${name}`;
        const text = `
    ${html_instructions}
    ${departure_time} ${departure_name}
    ->
    ${arrival_time} ${arrival_name}

    Ціна: ${price}
    Відстань: ${distance_text}
    Тривалість: ${duration_text}
    `;
        const { lat, lng } = data.start_location;
        bot_1.bot.sendVenue(msg.chat.id, [lat, lng], title, departure_name);
        bot_1.bot.sendMessage(msg.chat.id, text);
    }
    else {
        bot_1.bot.sendMessage(msg.chat.id, 'There no public transport faster than walking');
    }
    delete localData_1.userStatuses[msg.chat.id];
}
async function saveToDb(leg, chatId) {
    const { start_address, end_address } = leg;
    const formatedStartAddress = formatAddress(start_address);
    const formatedEndAddress = formatAddress(end_address);
    const startCandidate = await StartAddress_1.StartAddressModel.findOne({
        address: formatedStartAddress,
        chatId
    });
    const endCandidate = await EndAddress_1.EndAddressModel.findOne({
        address: formatedEndAddress
    });
    console.log('candidate', JSON.stringify(startCandidate));
    if (!startCandidate) {
        await StartAddress_1.StartAddressModel.create({
            address: formatedStartAddress,
            chatId
        });
    }
    if (!endCandidate) {
        await EndAddress_1.EndAddressModel.create({
            address: formatedEndAddress,
            chatId
        });
    }
    // console.log('leg', JSON.stringify(leg))
}
function formatAddress(address) {
    const formated = address.split(',').slice(0, -3).join();
    return formated;
}
