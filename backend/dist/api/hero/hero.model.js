"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    ability: { type: String, enum: ['attacker', 'defender'], required: true },
    colors: [String],
    trainingHistory: [Object],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, default: 0 },
});
schema.virtual('currentPower').get(function () {
    var _a;
    return ((_a = this.trainingHistory[0]) === null || _a === void 0 ? void 0 : _a.power) || 0;
});
schema.virtual('trainsToday').get(function () {
    let count = 0;
    for (const training of this.trainingHistory) {
        if (Date.now() - training.date > 24 * 60 * 60 * 1000)
            return count;
        else
            count++;
    }
    return count;
});
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });
exports.HeroModel = (0, mongoose_1.model)('Hero', schema);
