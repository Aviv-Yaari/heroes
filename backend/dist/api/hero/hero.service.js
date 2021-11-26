"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const logger_service_1 = require("../../services/logger.service");
const hero_model_1 = require("./hero.model");
const add = async (heroDetails) => {
    try {
        const hero = new hero_model_1.HeroModel(heroDetails);
        const createdHero = await hero.save();
        logger_service_1.logger.info("Created new hero: " + createdHero);
        return createdHero;
    }
    catch (err) {
        logger_service_1.logger.error("Error in add hero: " + err);
        throw err;
    }
};
exports.add = add;
