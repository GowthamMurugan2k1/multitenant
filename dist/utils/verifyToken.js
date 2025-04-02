"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRefreshToken = VerifyRefreshToken;
exports.VerifyAccessToken = VerifyAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
function VerifyRefreshToken(refreshToken) {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        return "failed";
    }
}
function VerifyAccessToken(accessToken) {
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return "failed";
    }
}
