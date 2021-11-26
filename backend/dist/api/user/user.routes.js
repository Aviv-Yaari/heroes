"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireAuth_middleware_1 = require("../../middlewares/requireAuth.middleware");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// middleware that is specific to this router
// router.use(requireAuth)
router.get("/", user_controller_1.getUsers);
router.get("/:id", user_controller_1.getUser);
router.put("/:id", requireAuth_middleware_1.requireAuth, user_controller_1.updateUser);
// router.put('/:id',  requireAuth, updateUser)
router.delete("/:id", requireAuth_middleware_1.requireAuth, requireAuth_middleware_1.requireAdmin, user_controller_1.deleteUser);
exports.default = router;
