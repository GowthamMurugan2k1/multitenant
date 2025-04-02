"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoutes = void 0;
const verifyToken_1 = require("../utils/verifyToken");
// Middleware to verify JWT token
const protectedRoutes = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).send("Authentication required.");
        return;
    }
    try {
        const decoded = (0, verifyToken_1.VerifyAccessToken)(token);
        if (decoded === "failed") {
            res.status(401).send("Authentication failed.");
            return;
        }
        req.user = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ status: false, error: "Invalid token" });
    }
};
exports.protectedRoutes = protectedRoutes;
