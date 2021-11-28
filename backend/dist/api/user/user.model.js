"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    heroes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Hero' }],
    isAdmin: { type: Boolean, default: false },
});
exports.UserModel = (0, mongoose_1.model)('User', schema);
