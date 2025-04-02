"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor(message, statusCode, success) {
        this.message = message;
        this.statusCode = statusCode;
        this.success = success;
    }
}
exports.ErrorResponse = ErrorResponse;
