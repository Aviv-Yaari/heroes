"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_middleware_1 = require("../../middlewares/catchAsync.middleware");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.get('/current', (0, catchAsync_middleware_1.catchAsync)(auth_controller_1.getLoggedInUser));
router.post('/login', (0, catchAsync_middleware_1.catchAsync)(auth_controller_1.login));
router.post('/signup', (0, catchAsync_middleware_1.catchAsync)(auth_controller_1.signup));
router.post('/logout', (0, catchAsync_middleware_1.catchAsync)(auth_controller_1.logout));
exports.default = router;
