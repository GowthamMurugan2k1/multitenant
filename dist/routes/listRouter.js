"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectedRoutes_1 = require("../middlewares/protectedRoutes");
const list_controller_1 = require("../controller/list-controller");
const listRouter = (0, express_1.Router)();
listRouter.post('/', protectedRoutes_1.protectedRoutes, list_controller_1.handleCreateList);
exports.default = listRouter;
