"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroService = void 0;
const mongoose_1 = require("mongoose");
const error_service_1 = require("../../services/error.service");
const user_model_1 = require("../user/user.model");
const hero_model_1 = require("./hero.model");
const query = async (filter) => {
    const criteria = {};
    if (filter.userId)
        criteria.userId = filter.userId;
    if (filter.userId === 'none')
        criteria.userId = { $exists: false };
    if (filter.ability)
        criteria.ability = filter.ability;
    if (filter.minPower && filter.maxPower)
        criteria.power = { $gte: +filter.minPower, $lte: +filter.maxPower };
    const heroes = await hero_model_1.HeroModel.find(criteria).sort({ power: -1 });
    return heroes;
};
const add = async (heroDetails) => {
    const hero = new hero_model_1.HeroModel(heroDetails);
    const createdHero = await hero.save();
    return createdHero;
};
const train = async (id, userId) => {
    const hero = await hero_model_1.HeroModel.findById(id);
    if (!hero)
        throw new error_service_1.ExpressError('Hero not found', 404);
    if (hero.get('trainsToday') === 5)
        throw new error_service_1.ExpressError('Exceeded day training limit', 400);
    const growth = Math.ceil(Math.random() * 10);
    hero.trainingHistory.unshift({ date: Date.now(), power: hero.power + growth });
    hero.power += growth;
    await hero.save();
    await user_model_1.UserModel.updateOne({ _id: userId }, { $inc: { money: growth * 50 } });
    return hero;
};
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
exports.heroService = { query, add, train, assign };
