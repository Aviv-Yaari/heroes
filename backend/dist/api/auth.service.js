"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = __importDefault(require("../user/user.service"));
// import logger from '../../services/logger.service';
const login = async (username, password) => {
    //   logger.debug(`auth.service - login with username: ${username}`);
    const user = await user_service_1.default.getByUsername(username);
    if (!user)
        throw 'Invalid username or password';
    // TODO: un-comment for real login
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid username or password')
    delete user.password;
    user._id = user._id.toString();
    return user;
};
const signup = async (username, password, fullname) => {
    const saltRounds = 10;
    //   logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`);
    if (!username || !password || !fullname)
        throw 'fullname, username and password are required!';
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    return user_service_1.default.add({ username, password: hash, fullname });
};
module.exports = {
    signup,
    login,
};
