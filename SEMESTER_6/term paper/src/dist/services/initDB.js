"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
mongoose_1.default.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gajzw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`).then(() => {
    console.log('DB connected!');
});
