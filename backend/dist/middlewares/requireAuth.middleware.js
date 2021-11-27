"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const logger_service_1 = require("../services/logger.service");
const requireAuth = async (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.status(401).end('Not authenticated');
        return;
    }
    next();
};
exports.requireAuth = requireAuth;
const requireAdmin = async (req, res, next) => {
    const { user } = req.session;
    if (!user)
        return res.status(500).end('User not found');
    if (!user.isAdmin) {
        logger_service_1.logger.warn('Attempt to perform admin action by username: ' + user.username);
        return res.status(403).end('Unauthorized');
    }
    next();
};
exports.requireAdmin = requireAdmin;
