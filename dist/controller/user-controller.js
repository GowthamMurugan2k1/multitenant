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
exports.handleRevalidate = exports.handleGetUserSpace = exports.handleEmailLogin = exports.handleCreateUser = exports.handleGoogleSignIn = exports.handleGetUser = void 0;
const decryptData_1 = require("../utils/decryptData");
const prismaClient_js_1 = require("../lib/prismaClient.js");
const error_middleware_1 = require("../middlewares/error-middleware");
const generateToken_1 = require("../utils/generateToken");
const ErrorResponse_1 = require("../common/ErrorResponse");
const verifyToken_1 = require("../utils/verifyToken");
const JWT_SECRET = process.env.JWT_SECRET;
exports.handleGetUser = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_js_1.prismaClient.user.findMany({
        include: { space: true, Task_Assignees: true },
    });
    res.status(200).json({ status: true, message: user });
}));
const handleGoogleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.handleGoogleSignIn = handleGoogleSignIn;
exports.handleCreateUser = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: "Data is required" });
            return;
        }
        const decryptPass = (0, decryptData_1.decryptData)(password);
        if (!decryptPass) {
            res.status(400).json({ error: "Decryption failed" });
            return;
        }
        // Check is email is Exist
        const isEmailExist = yield prismaClient_js_1.prismaClient.user.findUnique({
            where: { emailId: email },
        });
        if (isEmailExist) {
            res.status(400).json({ error: "User already exists." });
            return;
        }
        const addNewUser = yield prismaClient_js_1.prismaClient.user.create({
            data: { emailId: email, name, password: decryptPass },
            select: {
                emailId: true,
                name: true,
                profilePic: true,
                id: true,
                password: true,
                tenantId: true,
            },
        });
        if (!JWT_SECRET) {
            throw new Error(`JWT Seceret is ${JWT_SECRET}`);
        }
        let userId = addNewUser === null || addNewUser === void 0 ? void 0 : addNewUser.id;
        const access_token = (0, generateToken_1.generateAccessToken)({ id: userId });
        const refreshToken = (0, generateToken_1.generateRefreshToken)({ id: userId });
        yield prismaClient_js_1.prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: refreshToken,
            },
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.setHeader("Authorization", `Bearer ${access_token}`);
        const { emailId, id, name: userName, profilePic, tenantId } = addNewUser;
        let UserInfo = {
            emailId,
            id,
            name: userName,
            profilePic,
            tenantId: tenantId
        };
        res.status(201).json({ status: true, UserInfo, access_token });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Login user => Email login
exports.handleEmailLogin = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .send({ status: false, error: "Email and Password is required" });
            return;
        }
        // decrypt the password
        const decryptedPass = (0, decryptData_1.decryptData)(password);
        const fetchUser = yield prismaClient_js_1.prismaClient.user.findUnique({
            where: {
                emailId: email.toLowerCase(),
            },
            select: {
                emailId: true,
                name: true,
                profilePic: true,
                id: true,
                password: true,
                tenantId: true,
            },
        });
        if (!fetchUser) {
            res.status(400).json({ status: false, error: "User not found." });
            return;
        }
        if (decryptedPass != (fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.password)) {
            res
                .status(400)
                .json({ status: false, error: "Password is incorrect." });
            return;
        }
        if (!JWT_SECRET) {
            throw new Error(`JWT Seceret is ${JWT_SECRET}`);
        }
        let userId = fetchUser.id;
        const access_token = (0, generateToken_1.generateAccessToken)({ id: userId });
        const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: userId });
        yield prismaClient_js_1.prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: refresh_token,
            },
        });
        res.cookie("refreshToken", refresh_token, {
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.setHeader("Authorization", `Bearer ${access_token}`);
        const { emailId, id, name, profilePic, tenantId } = fetchUser;
        let UserInfo = {
            emailId,
            id,
            name,
            profilePic,
            tenantId
        };
        res.status(200).json({ status: true, UserInfo, access_token });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Get user Space
exports.handleGetUserSpace = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).send({ status: false, message: "userId is required" });
        return;
    }
    const userSpace = yield prismaClient_js_1.prismaClient.space.findFirst({
        where: {
            userId,
        },
        include: { list: true },
    });
    res.status(200).send({ status: true, message: userSpace });
}));
// ReValidate user through refreshToken and generate a accessToken
exports.handleRevalidate = (0, error_middleware_1.CatchAsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refreshToken) {
        res
            .status(400)
            .send({ status: false, message: "refreshToken is required" });
        return;
    }
    console.log(refreshToken, "refresh--------------toke");
    const decoded = (0, verifyToken_1.VerifyRefreshToken)(refreshToken);
    if (decoded === "failed") {
        throw new ErrorResponse_1.ErrorResponse("verification is failed", 400, false);
    }
    const { id } = decoded;
    const user = yield prismaClient_js_1.prismaClient.user.findUnique({
        where: {
            id,
        },
        select: {
            refreshToken: true,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.refreshToken) !== refreshToken) {
        throw new ErrorResponse_1.ErrorResponse("Invalid refresh token", 400, false);
    }
    const newAccessToken = (0, generateToken_1.generateAccessToken)(id);
    const newRefreshToken = (0, generateToken_1.generateRefreshToken)(id);
    yield prismaClient_js_1.prismaClient.user.update({
        where: {
            id,
        },
        data: {
            refreshToken: newRefreshToken,
        },
    });
    res.cookie("refreshToken", newRefreshToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        httpOnly: true,
    });
    res.status(200).send({ status: true, message: newAccessToken });
}));
