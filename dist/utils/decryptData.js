"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = decryptData;
const node_rsa_1 = __importDefault(require("node-rsa"));
function decryptData(encryptedData) {
    try {
        const privKey = process.env.PRIVATE_KEY;
        if (!privKey) {
            throw new Error("Private key is not set in environment variables.");
        }
        // Load existing private key
        const key = new node_rsa_1.default(privKey, "private", { encryptionScheme: "pkcs1", environment: "browser" });
        // Decrypt the data
        const decryptedData = key.decrypt(encryptedData, "utf8");
        return decryptedData;
    }
    catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
}
