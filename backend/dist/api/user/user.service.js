"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// import dbService from "../../services/db.service";
const logger_service_1 = require("../../services/logger.service");
const user_model_1 = require("./user.model");
const add = async (userDetails) => {
    try {
        const user = new user_model_1.UserModel(userDetails);
        await user.save();
        logger_service_1.logger.info("New user created: " + user.username);
    }
    catch (err) {
        logger_service_1.logger.error("Error in create user: " + err);
        throw err;
    }
};
const getByUsername = async (username) => {
    try {
        const user = await user_model_1.UserModel.findOne({ username });
        return user;
    }
    catch (err) {
        logger_service_1.logger.error("Error in get by username: " + err);
        throw err;
    }
};
exports.userService = { add, getByUsername };
