"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = exports.train = exports.add = exports.getById = exports.getAll = void 0;
const heroService = __importStar(require("./hero.service"));
const getAll = async (req, res) => {
    const heroes = await heroService.query(req.query);
    res.json(heroes);
};
exports.getAll = getAll;
const getById = async (req, res) => { };
exports.getById = getById;
const add = async (req, res) => {
    const hero = await heroService.add(req.body);
    res.json(hero);
};
exports.add = add;
const train = async (req, res) => {
    const hero = await heroService.train(req.params.id);
    res.json(hero);
};
exports.train = train;
const assign = async (req, res) => {
    let hero;
    const { heroId, userId } = req.params;
    const { isAdmin, _id: currentUserId } = req.session.user;
    if (isAdmin)
        hero = await heroService.assign(heroId, userId);
    else
        hero = await heroService.assign(heroId, currentUserId);
    res.json(hero);
};
exports.assign = assign;
