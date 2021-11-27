"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const logger_service_1 = require("../services/logger.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../api/user/user.service");
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).end("Not authenticated, please login");
    try {
        const { username } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = await user_service_1.userService.getByUsername(username);
        next();
    }
    catch (err) {
        logger_service_1.logger.error("Authentication error: " + err);
        return res.status(403).end("Authentication error");
    }
};
exports.requireAuth = requireAuth;
const requireAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin) {
        logger_service_1.logger.warn("Attempt to perform admin action by username: " + user.username);
        return res.status(403).end("Unauthorized");
    }
    next();
};
exports.requireAdmin = requireAdmin;
