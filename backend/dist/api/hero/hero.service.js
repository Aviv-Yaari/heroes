"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = exports.train = exports.add = exports.query = void 0;
const mongoose_1 = require("mongoose");
const error_service_1 = require("../../services/error.service");
const user_model_1 = require("../user/user.model");
const hero_model_1 = require("./hero.model");
const query = async (filter) => {
    const heroes = await hero_model_1.HeroModel.find(filter).populate('userId', 'username');
    return heroes;
};
exports.query = query;
const add = async (heroDetails) => {
    const hero = new hero_model_1.HeroModel(heroDetails);
    const createdHero = await hero.save();
    return createdHero;
};
exports.add = add;
const train = async (id) => {
    const hero = await hero_model_1.HeroModel.findById(id).populate('userId', 'username');
    if (!hero)
        throw new error_service_1.ExpressError('Hero not found', 404);
    if (hero.get('trainsToday') === 5)
        throw new error_service_1.ExpressError('Exceeded day training limit', 400);
    const growth = Math.ceil(Math.random() * 10);
    hero.trainingHistory.unshift({ date: Date.now(), power: hero.currentPower + growth });
    await hero.save();
    return hero;
};
exports.train = train;
const assign = async (heroId, userId) => {
    const hero = await hero_model_1.HeroModel.findById(heroId);
    if (!hero)
        throw new error_service_1.ExpressError('Could not find hero', 404);
    const user = await user_model_1.UserModel.findById(userId);
    if (!user)
        throw new error_service_1.ExpressError('Could not find user', 404);
    if (hero.price > user.money)
        throw new error_service_1.ExpressError('Not enough money', 400);
    hero.userId = new mongoose_1.Types.ObjectId(userId);
    await hero.save();
    await user.updateOne({
        $addToSet: { heroes: new mongoose_1.Types.ObjectId(heroId) },
        $inc: { money: hero.price * -1 },
    });
    return hero.populate('userId', 'username');
};
exports.assign = assign;
function _checkDayLimit(trainingHistory) {
    // checks training day limit (5 trains per day).
    // returns true if valid, false if exceeded day limit.
    if (trainingHistory.length < 5)
        return true;
    for (let i = 0; i < 5; i++) {
        const timestamp = +trainingHistory[i].date;
        if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
            // if more than 24 hours have passed since the training:
            return true;
        }
    }
    return false;
}
