"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const logger_service_1 = require("../../services/logger.service");
const auth_service_1 = __importDefault(require("./auth.service"));
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await auth_service_1.default.login(username, password);
        res.send(token);
    }
    catch (err) {
        logger_service_1.logger.error("Failed to Login " + err);
        res.status(401).send({ err: "Failed to login: " + err });
    }
};
exports.login = login;
const signup = async (req, res) => {
    try {
        const user = req.body;
        await auth_service_1.default.signup(user);
        const token = await auth_service_1.default.login(user.username, user.password);
        res.send(token);
    }
    catch (err) {
        logger_service_1.logger.error("Failed to signup: " + err);
        res.status(500).send({ err });
    }
};
exports.signup = signup;
