"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateSpace = void 0;
const prismaClient_js_1 = require("../lib/prismaClient.js");
const error_middleware_1 = require("../middlewares/error-middleware");
const ColorPicker_js_1 = require("../lib/ColorPicker.js");
exports.handleCreateSpace = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Space, List } = req.body;
    if (!Space || !List) {
        res.status(400).send({ status: false, error: "fields are required" });
        return;
    }
    // const  parsedList = JSON.parse(List);
    // console.log(req.body,'bodyyyy',parsedList)
    const userId = req === null || req === void 0 ? void 0 : req.user;
    if (!userId) {
        res.status(400).send({ status: false, error: "userId is required" });
        return;
    }
    try {
        yield prismaClient_js_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const currUser = yield tx.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!(currUser === null || currUser === void 0 ? void 0 : currUser.tenantId)) {
                res
                    .status(400)
                    .send({ status: false, error: "tenantId is required" });
                return;
            }
            const SpaceCreation = yield tx.space.create({
                data: {
                    spaceName: Space,
                    userId: userId,
                    tenantId: currUser === null || currUser === void 0 ? void 0 : currUser.tenantId,
                    list: {
                        create: {
                            listName: List,
                            color: (0, ColorPicker_js_1.RandomColorPicker)().hex,
                            userId: userId,
                        },
                    },
                },
                include: { list: true }
            });
            res.status(201).json({ status: true, data: SpaceCreation });
        }));
    }
    catch (error) {
        console.error("Error creating space:", error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
}));
