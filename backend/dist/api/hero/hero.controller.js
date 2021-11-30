"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = exports.train = exports.add = exports.getById = exports.getAll = void 0;
const hero_service_1 = require("./hero.service");
const getAll = async (req, res) => {
    const heroes = await hero_service_1.heroService.query(req.query);
    res.json(heroes);
};
exports.getAll = getAll;
const getById = async (req, res) => {
    const heroes = await hero_service_1.heroService.query({ _id: req.params.id });
    res.json(heroes[0]);
};
exports.getById = getById;
const add = async (req, res) => {
    const hero = await hero_service_1.heroService.add(req.body);
    res.json(hero);
};
exports.add = add;
const train = async (req, res) => {
    const hero = await hero_service_1.heroService.train(req.params.id, req.session.user._id);
    res.json(hero);
};
exports.train = train;
const assign = async (req, res) => {
    let hero;
    const { heroId, userId } = req.params;
    const { isAdmin, _id: currentUserId } = req.session.user;
    // admin can assign to whoever they want
    if (isAdmin)
        hero = await hero_service_1.heroService.assign(heroId, userId);
    else
        hero = await hero_service_1.heroService.assign(heroId, currentUserId);
    res.json(hero);
};
exports.assign = assign;
