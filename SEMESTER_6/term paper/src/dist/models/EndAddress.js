"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndAddressModel = void 0;
const mongoose_1 = require("mongoose");
const EndAddressSchema = new mongoose_1.Schema({
    chatId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const EndAddressModel = (0, mongoose_1.model)('arrivals', EndAddressSchema);
exports.EndAddressModel = EndAddressModel;
