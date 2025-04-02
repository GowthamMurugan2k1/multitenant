"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error-middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./.env" });
const Port = process.env.PORT;
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(error_middleware_1.errorMiddleware);
// Cookies parser
app.use((0, cookie_parser_1.default)());
// the CORS options
const corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000"], // Whitelisted Domain
};
app.use((0, cors_1.default)(corsOptions));
// Accept JSON
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.listen(Port, () => console.log(`Server running at http://localhost:${Port}`));
