"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_service_1 = require("../../services/error.service");
const logger_service_1 = require("../../services/logger.service");
const user_service_1 = require("../user/user.service");
const login = async (username, password) => {
    const user = await user_service_1.userService.query({ username });
    if (!user)
        throw new error_service_1.ExpressError('Invalid username or password', 401);
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        throw new error_service_1.ExpressError('Invalid username or password', 401);
    return { ...user.toJSON(), _id: user._id, password: undefined };
};
const signup = async (username, fullname, password) => {
    const saltRounds = 10;
    logger_service_1.logger.debug(`Signup with username: ${username}`);
    if (!username || !password || !fullname)
        throw new error_service_1.ExpressError('fullname, username and password are required', 400);
    const passwordErrors = _checkPassword(password);
    if (passwordErrors.length)
        throw new error_service_1.ExpressError(JSON.stringify(passwordErrors), 400);
    const existingUser = await user_service_1.userService.query({ username });
    if (existingUser)
        throw new error_service_1.ExpressError('User already exists', 400);
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    await user_service_1.userService.add({ username, password: hash, fullname, isAdmin: false, money: 0 });
    return { username, password: hash, fullname };
};
function _checkPassword(password) {
    const errors = [];
    if (password.length < 8)
        errors.push('Password must be at least 8 characters long');
    if (!/[A-Z]/.test(password))
        errors.push('Password must contain a capital letter');
    if (/^[a-zA-Z0-9]*$/.test(password))
        errors.push('Password must contain a special character');
    if (!/[0-9]/.test(password))
        errors.push('Password must contain a digit');
    return errors;
}
exports.default = { login, signup };
