"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_middleware_1 = require("../../middlewares/catchAsync.middleware");
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const hero_controller_1 = require("./hero.controller");
const router = express_1.default.Router();
router.get('/', requireAuth_middleware_1.requireAuth, (0, catchAsync_middleware_1.catchAsync)(hero_controller_1.getAll));
router.get('/:id', (0, catchAsync_middleware_1.catchAsync)(hero_controller_1.getById));
router.post('/', requireAuth_middleware_1.requireAdmin, (0, catchAsync_middleware_1.catchAsync)(hero_controller_1.add));
router.put('/:id/train', requireAuth_middleware_1.requireAuth, (0, catchAsync_middleware_1.catchAsync)(hero_controller_1.train));
router.put('/:heroId/assign/:userId?', requireAuth_middleware_1.requireAuth, (0, catchAsync_middleware_1.catchAsync)(hero_controller_1.assign));
exports.default = router;
