"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./services/initDB");
const bot_1 = require("./services/bot");
const maps_1 = require("./services/maps");
const localData_1 = require("./storage/localData");
const StartAddress_1 = require("./models/StartAddress");
const EndAddress_1 = require("./models/EndAddress");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const utils_1 = require("./utils");
const strings_1 = __importDefault(require("./strings"));
let statistic = true;
bot_1.bot.on('/start', msg => bot_1.bot.sendMessage(msg.chat.id, strings_1.default.START));
bot_1.bot.on('location', controller);
bot_1.bot.on('text', controller);
bot_1.bot.on('/find', async (msg) => {
    localData_1.userStatuses[msg.chat.id] = { status: 'find' };
    const starts = await StartAddress_1.StartAddressModel.find({
        chatId: msg.chat.id
    });
    const keyboard = starts.slice(0, 5).reduce((acc, { address }) => {
        acc.push([address]);
        return acc;
    }, []);
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.SEND_YOUR_LOCATION, {
        replyMarkup: bot_1.bot.keyboard(keyboard, { resize: true, once: true })
    });
});
bot_1.bot.on('/saved_departures', async (msg) => {
    const departures = await StartAddress_1.StartAddressModel.find({
        chatId: msg.chat.id
    });
    const departs = departures.map(d => d.address);
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.YOUR_DEPARTURES + departs.join('\n'));
});
bot_1.bot.on('/saved_arrivals', async (msg) => {
    const departures = await EndAddress_1.EndAddressModel.find({
        chatId: msg.chat.id
    });
    const departs = departures.map(d => d.address);
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.YOUR_ARRIVALS + departs.join('\n'));
});
bot_1.bot.on('/remove_departures', async (msg) => {
    await StartAddress_1.StartAddressModel.remove({
        chatId: msg.chat.id
    });
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.DEPARTURES_REMOVED);
});
bot_1.bot.on('/remove_arrivals', async (msg) => {
    const departures = await EndAddress_1.EndAddressModel.remove({
        chatId: msg.chat.id
    });
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.ARRIVALS_REMOVED);
});
bot_1.bot.on('/enable_statistic', msg => {
    statistic = true;
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.STATISTIC_ON);
});
bot_1.bot.on('/disable_statistic', msg => {
    statistic = true;
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.STATISTIC_OFF);
});
bot_1.bot.on('/help', msg => {
    statistic = true;
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.HELP);
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
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.SEND_LOCATION, {
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
    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.BEST_WAY);
    if (data) {
        await saveToDb(leg, msg.chat.id);
        const price = route?.fare?.text;
        const { distance: { text: distance_text }, duration: { text: duration_text }, html_instructions, transit_details: { line: { name, short_name, vehicle, }, departure_time: { text: departure_time, }, departure_stop: { name: departure_name, }, arrival_time: { text: arrival_time, }, arrival_stop: { name: arrival_name, }, }, route: googleRoute, transport_id } = data;
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
        try {
            const checkFunc = async () => {
                const easyWayData = await (0, node_fetch_1.default)(`https://gps.easyway.info/api/city/drogobych/route/${googleRoute}/id/${transport_id}`);
                const { hours, minutes } = (await easyWayData.json()).route.bus.departure;
                const timeToDepartureInMinutes = (0, utils_1.toMinutes)(`${hours}:${minutes}`);
                if (timeToDepartureInMinutes <= 60) {
                    bot_1.bot.sendMessage(msg.chat.id, strings_1.default.TRANSPORT_IS_CUMMING);
                    clearInterval(interval);
                }
            };
            await checkFunc();
            const interval = setInterval(checkFunc, 1000 * 30);
        }
        catch {
            const nowtime = await (0, node_fetch_1.default)('https://timeapi.io/api/Time/current/zone?timeZone=Europe/Kiev');
            const { hour, minute } = await nowtime.json();
            const time = (0, utils_1.getTransoprtTime)(departure_time, `${hour}:${minute}`);
            setTimeout(() => {
                bot_1.bot.sendMessage(msg.chat.id, strings_1.default.TRANSPORT_IS_CUMMING);
            }, 1000 * 60 * (time - 1));
        }
        const { lat, lng } = data.start_location;
        bot_1.bot.sendVenue(msg.chat.id, [lat, lng], title, departure_name);
        bot_1.bot.sendMessage(msg.chat.id, text);
    }
    else {
        bot_1.bot.sendMessage(msg.chat.id, strings_1.default.NO_TRANSPORT);
    }
    delete localData_1.userStatuses[msg.chat.id];
}
async function saveToDb(leg, chatId) {
    if (!statistic)
        return;
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
}
function formatAddress(address) {
    const formated = address.split(',').slice(0, -3).join();
    return formated;
}
