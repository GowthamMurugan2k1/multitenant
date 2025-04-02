"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const taskRouter_1 = __importDefault(require("./taskRouter"));
const spaceRouter_1 = __importDefault(require("./spaceRouter"));
const tenant_1 = __importDefault(require("./tenant"));
const listRouter_1 = __importDefault(require("./listRouter"));
const router = (0, express_1.Router)();
router.use('/user', userRoute_1.default);
router.use('/task', taskRouter_1.default);
router.use('/space', spaceRouter_1.default);
router.use('/tenant', tenant_1.default);
router.use('/list', listRouter_1.default);
exports.default = router;
