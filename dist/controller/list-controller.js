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
exports.handleCreateList = void 0;
const error_middleware_1 = require("../middlewares/error-middleware");
const prismaClient_1 = require("../lib/prismaClient");
const ColorPicker_1 = require("../lib/ColorPicker");
exports.handleCreateList = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { spaceId, listName } = req.body;
    if (!spaceId || !listName) {
        res
            .status(400)
            .send({ status: false, message: "SpaceId and is required" });
        return;
    }
    const userId = req.user;
    const updatedList = yield prismaClient_1.prismaClient.list.create({
        data: {
            userId: userId,
            listName,
            spaceId: spaceId,
            color: (0, ColorPicker_1.RandomColorPicker)().hex,
        },
    });
    res.status(201).send({ status: true, message: updatedList });
}));
