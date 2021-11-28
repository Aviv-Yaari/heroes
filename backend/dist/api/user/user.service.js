"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const logger_service_1 = require("../../services/logger.service");
const user_model_1 = require("./user.model");
const add = async (userDetails) => {
    try {
        const user = new user_model_1.UserModel(userDetails);
        await user.save();
        logger_service_1.logger.info('New user created: ' + user.username);
    }
    catch (err) {
        logger_service_1.logger.error('Error in create user: ' + err);
        throw err;
    }
};
const query = async (filter) => {
    try {
        const user = await user_model_1.UserModel.findOne(filter);
        return user;
    }
    catch (err) {
        logger_service_1.logger.error('Error in query users: ' + err);
        throw err;
    }
};
exports.userService = { add, query };
