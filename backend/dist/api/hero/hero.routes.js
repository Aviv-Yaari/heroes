"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hero_controller_1 = require("./hero.controller");
const router = express_1.default.Router();
router.get("/", hero_controller_1.getAll);
router.get("/:id", hero_controller_1.getById);
router.post("/", hero_controller_1.add);
exports.default = router;
