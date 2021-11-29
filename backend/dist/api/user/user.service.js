"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const add = async (userDetails) => {
    const user = new user_model_1.UserModel(userDetails);
    await user.save();
};
const query = async (filter) => {
    const user = await user_model_1.UserModel.findOne(filter);
    return user;
};
exports.userService = { add, query };
