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
exports.FetchTenant = exports.handleFindTenant = exports.handleCreateTenant = void 0;
const error_middleware_1 = require("../middlewares/error-middleware");
const prismaClient_js_1 = require("../lib/prismaClient.js");
exports.handleCreateTenant = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantName } = req.body;
    if (!tenantName) {
        res.status(400).json({
            status: false,
            message: "Company or project Name is required",
        });
        return;
    }
    const userId = req.user;
    const isExist = yield prismaClient_js_1.prismaClient.user.findUnique({
        where: {
            id: userId
        }
    });
    if (isExist === null || isExist === void 0 ? void 0 : isExist.tenantId) {
        res.status(400).json({
            status: false,
            message: "you can't create multiple Base.",
        });
        return;
    }
    yield prismaClient_js_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const tenantdetails = yield tx.tenant.create({
            data: {
                name: tenantName,
            },
            select: {
                name: true,
                id: true,
            },
        });
        yield tx.user.update({
            where: {
                id: userId,
            },
            data: {
                tenantId: tenantdetails.id,
            },
        });
        res.status(201).send({ status: true, message: tenantdetails });
        return;
    }));
}));
exports.handleFindTenant = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { find } = req.params;
    if (!find) {
        res.status(400).send({ status: false, message: "query is required" });
        return;
    }
    if (find.length < 3) {
        res.status(400).send({
            status: false,
            message: "Base name should have more than three letters.",
        });
        return;
    }
    const isExist = yield prismaClient_js_1.prismaClient.tenant.findUnique({
        where: {
            name: find.toLocaleLowerCase(),
        },
    });
    const isAvailable = isExist ? false : true;
    res.status(200).send({ status: true, message: isAvailable });
}));
// Fetch tenant
exports.FetchTenant = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    if (!userId) {
        res.status(400).send({ status: false, message: "userid is missing" });
        return;
    }
    yield prismaClient_js_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const tenantID = yield tx.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                tenantId: true,
            },
        });
        if (!tenantID || !tenantID.tenantId) {
            res.status(400).send({ status: false, error: "tenantId is required" });
            return;
        }
        const UserTenant = yield prismaClient_js_1.prismaClient.tenant.findUnique({
            where: {
                id: tenantID.tenantId,
            },
            select: {
                name: true,
                space: {
                    include: {
                        list: true,
                    },
                },
            },
        });
        res.status(200).send({ status: true, message: UserTenant });
    }));
}));
