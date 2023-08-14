"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_SECRET = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.MONGODB_DB = exports.MONGODB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGODB_URL = ensureEnvVarExistance('MONGODB_URL');
exports.MONGODB_DB = ensureEnvVarExistance('MONGODB_DB');
exports.GOOGLE_CLIENT_ID = ensureEnvVarExistance('GOOGLE_CLIENT_ID');
exports.GOOGLE_CLIENT_SECRET = ensureEnvVarExistance('GOOGLE_CLIENT_SECRET');
exports.JWT_SECRET = ensureEnvVarExistance('JWT_SECRET');
exports.PORT = ensureEnvVarExistance('PORT');
function ensureEnvVarExistance(name) {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`${name} must be defined as an env variable`);
    }
    return value;
}
