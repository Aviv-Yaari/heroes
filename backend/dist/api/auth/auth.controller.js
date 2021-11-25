"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signup = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await auth_service_1.default.login(username, password);
        // req.session.user = user;
        res.json(user);
    }
    catch (err) {
        // logger.error('Failed to Login ' + err);
        res.status(401).send({ err: 'Failed to Login' });
    }
};
exports.login = login;
const signup = async (req, res) => {
    try {
        const { username, password, fullname } = req.body;
        const account = await auth_service_1.default.signup(username, password, fullname);
        // logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
        const user = await auth_service_1.default.login(username, password);
        // req.session.user = user;
        res.json(user);
    }
    catch (err) {
        // logger.error('Failed to signup ' + err);
        res.status(500).send({ err: 'Failed to signup' });
    }
};
exports.signup = signup;
const logout = async (req, res) => {
    try {
        // req.session.destroy()
        // req.session.user = null;
        res.send({ msg: 'Logged out successfully' });
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to logout' });
    }
};
exports.logout = logout;
module.exports = {
    login: exports.login,
    signup: exports.signup,
    logout: exports.logout,
};
