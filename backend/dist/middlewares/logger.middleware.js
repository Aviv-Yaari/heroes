"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_service_1 = require("../services/logger.service");
const loggerMiddleware = (req, res, next) => {
    logger_service_1.logger.info(req.method + ' ' + req.path);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
