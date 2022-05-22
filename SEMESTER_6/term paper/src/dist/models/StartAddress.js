"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartAddressModel = void 0;
const mongoose_1 = require("mongoose");
const StartAddressSchema = new mongoose_1.Schema({
    chatId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const StartAddressModel = (0, mongoose_1.model)('departures', StartAddressSchema);
exports.StartAddressModel = StartAddressModel;
