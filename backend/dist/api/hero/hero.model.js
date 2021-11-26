"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    ability: { type: String, enum: ["attacker", "defender"], required: true },
    colors: { type: [String] },
    trainingHistory: { type: [Object] },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.HeroModel = (0, mongoose_1.model)("Hero", schema);
