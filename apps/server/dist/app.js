"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const logger_1 = __importDefault(require("./lib/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//change to dotenv later
app.use(express_1.default.json());
app.use(router_1.default);
function startServer() {
    const port = 8080;
    mongoose_1.default.connect("mongodb+srv://bienmag:12345@oakmap.kjrgfwk.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("✅ Database connection successful")).catch(() => console.log("database connection error"));
    const server = app.listen(port, () => {
        logger_1.default.info(`🧨🫡  Server running and listening on http://localhost:${port}/`);
    });
    process.on("SIGTERM", () => {
        server.close();
    });
    return server;
}
exports.startServer = startServer;
exports.default = app;
