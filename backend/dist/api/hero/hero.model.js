"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    ability: { type: String, enum: ['attacker', 'defender'], required: true },
    colors: [String],
    trainingHistory: [Object],
    power: { type: Number, default: 0 },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, default: 0 },
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
schema.pre('find', function () {
    this.populate('userId', 'username');
});
exports.HeroModel = (0, mongoose_1.model)('Hero', schema);
