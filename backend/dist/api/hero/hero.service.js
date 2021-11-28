"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = exports.train = exports.add = exports.query = void 0;
const mongoose_1 = require("mongoose");
const logger_service_1 = require("../../services/logger.service");
const user_model_1 = require("../user/user.model");
const hero_model_1 = require("./hero.model");
const query = async (filter) => {
    const heroes = await hero_model_1.HeroModel.find(filter);
    return heroes;
};
exports.query = query;
const add = async (heroDetails) => {
    const hero = new hero_model_1.HeroModel(heroDetails);
    const createdHero = await hero.save();
    logger_service_1.logger.info('Created new hero: ' + createdHero);
    return createdHero;
};
exports.add = add;
const train = async (id) => {
    const hero = await hero_model_1.HeroModel.findById(id);
    if (!hero)
        throw 'Hero not found';
    if (!_checkDayLimit(hero.trainingHistory))
        throw 'Exceeded training day limit';
    const growth = Math.ceil(Math.random() * 10);
    hero.trainingHistory.unshift({ [Date.now()]: hero.currentPower + growth });
    await hero.save();
    logger_service_1.logger.info('Trained hero: ' + hero._id);
    return hero;
};
exports.train = train;
const assign = async (heroId, userId) => {
    const updatedHero = await hero_model_1.HeroModel.findByIdAndUpdate(heroId, {
        userId: new mongoose_1.Types.ObjectId(userId),
    });
    await user_model_1.UserModel.findByIdAndUpdate(userId, {
        $addToSet: { heroes: new mongoose_1.Types.ObjectId(heroId) },
    });
    return updatedHero;
};
exports.assign = assign;
function _checkDayLimit(trainingHistory) {
    // checks training day limit (5 trains per day).
    // returns true if valid, false if exceeded day limit.
    if (trainingHistory.length < 5)
        return true;
    for (let i = 0; i < 5; i++) {
        const timestamp = +Object.keys(trainingHistory[i])[0];
        if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
            // if more than 24 hours have passed since the training:
            return true;
        }
    }
    return false;
}
