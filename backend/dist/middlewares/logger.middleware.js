"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const logger_service_1 = require("../services/logger.service");
const log = (req, res, next) => {
    //   if (req.session && req.session.user) {
    // logger.info("Req from: " + req.session.user.fullname);
    //   }
    logger_service_1.logger.info("request");
    next();
};
exports.log = log;
