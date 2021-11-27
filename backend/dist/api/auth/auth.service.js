"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_service_1 = require("../../services/logger.service");
const user_service_1 = require("../user/user.service");
// import logger from '../../services/logger.service';
const login = async (username, password) => {
    logger_service_1.logger.info(`Login attenpt with username: ${username}`);
    const user = await user_service_1.userService.getByUsername(username);
    if (!user)
        throw "Invalid username or password";
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        throw "Invalid username or password";
    const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
    logger_service_1.logger.info(`Login with username: ${username}`);
    return token;
};
const signup = async (user) => {
    const { username, password, fullname } = user;
    const saltRounds = 10;
    logger_service_1.logger.debug(`Signup with username: ${username}`);
    if (!username || !password || !fullname)
        throw "fullname, username and password are required";
    const passwordErrors = _checkPassword(password);
    if (passwordErrors.length)
        throw passwordErrors;
    const existingUser = await user_service_1.userService.getByUsername(username);
    if (existingUser)
        throw "User already exists";
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    await user_service_1.userService.add({ username, password: hash, fullname, isAdmin: false });
    return { username, password: hash, fullname };
};
function _checkPassword(password) {
    const errors = [];
    if (password.length < 8)
        errors.push("Password must be at least 8 characters long");
    if (!/[A-Z]/.test(password))
        errors.push("Password must contain a capital letter");
    if (/^[a-zA-Z0-9]*$/.test(password))
        errors.push("Password must contain a special character");
    if (!/[0-9]/.test(password))
        errors.push("Password must contain a digit");
    return errors;
}
exports.default = { login, signup };
