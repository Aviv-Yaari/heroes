"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const error_service_1 = require("../services/error.service");
const logger_service_1 = require("../services/logger.service");
const requireAuth = async (req, res, next) => {
    if (!req.session || !req.session.user) {
        next(new error_service_1.ExpressError('Not authenticated', 401));
    }
    next();
};
exports.requireAuth = requireAuth;
const requireAdmin = async (req, res, next) => {
    const { user } = req.session;
    if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        logger_service_1.logger.warn('Attempt to perform admin action. username: ' + (user === null || user === void 0 ? void 0 : user.username));
        next(new error_service_1.ExpressError('Unauthorized', 403));
    }
    next();
};
exports.requireAdmin = requireAdmin;
