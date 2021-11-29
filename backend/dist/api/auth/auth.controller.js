"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = exports.logout = exports.signup = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const user_service_1 = require("../user/user.service");
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await auth_service_1.default.login(username, password);
    req.session.user = { _id: user._id, username, isAdmin: user.isAdmin };
    res.send(user);
};
exports.login = login;
const signup = async (req, res) => {
    const { username, fullname, password } = req.body;
    await auth_service_1.default.signup(username, fullname, password);
    const user = await auth_service_1.default.login(username, password);
    req.session.user = { _id: user._id, username, isAdmin: user.isAdmin };
    res.send(user);
};
exports.signup = signup;
const logout = async (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out');
    });
};
exports.logout = logout;
const getLoggedInUser = async (req, res) => {
    const { user } = req.session;
    if (!user)
        return res.send(null);
    const loggedInUser = await user_service_1.userService.query({ _id: user._id });
    if (!loggedInUser)
        return res.send(null);
    res.send({ ...loggedInUser.toJSON(), password: undefined });
};
exports.getLoggedInUser = getLoggedInUser;
