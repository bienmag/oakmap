"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBMarkdown = exports.DBUser = exports.DBTree = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TreeSchema = new mongoose_1.default.Schema({
    _id: Object,
    treeName: String,
    date: Object,
    user: String,
    description: String,
    branches: Array,
    unlinkedLeaves: Array
}, { versionKey: false });
exports.DBTree = mongoose_1.default.model("DBTree", TreeSchema, "trees");
const UserSchema = new mongoose_1.default.Schema({
    user: String,
    treeName: Array
}, { versionKey: false });
exports.DBUser = mongoose_1.default.model("User", UserSchema, "users");
const MarkdownSchema = new mongoose_1.default.Schema({
    treeId: String,
    branchId: String,
    markdownText: String,
    leafId: String,
}, { versionKey: false });
exports.DBMarkdown = mongoose_1.default.model("Markdown", MarkdownSchema, "markdowns");
