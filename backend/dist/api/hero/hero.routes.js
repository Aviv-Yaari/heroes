"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const hero_controller_1 = require("./hero.controller");
const router = express_1.default.Router();
router.get('/', hero_controller_1.getAll);
router.get('/:id', hero_controller_1.getById);
router.post('/', requireAuth_middleware_1.requireAuth, requireAuth_middleware_1.requireAdmin, hero_controller_1.add);
router.put('/:id/train', requireAuth_middleware_1.requireAuth, hero_controller_1.train);
router.put('/:heroId/assign/:userId?', requireAuth_middleware_1.requireAuth, hero_controller_1.assign);
exports.default = router;
