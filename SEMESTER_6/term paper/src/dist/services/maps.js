"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = exports.maps = void 0;
require("dotenv/config");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const maps = new google_maps_services_js_1.Client({});
exports.maps = maps;
const key = process.env.GOOGLE_SEKRET_KEY || '';
exports.key = key;
