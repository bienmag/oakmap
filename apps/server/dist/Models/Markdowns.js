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
const mongo_1 = require("../lib/mongo");
const mongodb_1 = require("mongodb");
class Markdown {
    constructor(treeId, markdownText, branchId, leafId) {
        this.treeId = treeId;
        this.markdownText = markdownText;
        this.branchId = branchId;
        this.leafId = leafId;
    }
    static createBranchMD(treeId, markdownText, branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const markdownId = new mongodb_1.ObjectId();
            yield mongo_1.DBMarkdown.create({
                markdownId, treeId, markdownText, branchId
            });
        });
    }
    static createLeafMD(treeId, markdownText, leafId) {
        return __awaiter(this, void 0, void 0, function* () {
            const markdownId = new mongodb_1.ObjectId();
            yield mongo_1.DBMarkdown.create({
                markdownId, treeId, markdownText, leafId
            });
        });
    }
    static updateBranchMD(treeId, markdownText, branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            let markdown = yield mongo_1.DBMarkdown.findOne({ branchId: branchId });
            if (!markdown) {
                yield Markdown.createBranchMD(treeId, markdownText, branchId);
            }
            else {
                yield mongo_1.DBMarkdown.findOneAndUpdate({ branchId: branchId }, { $set: { "markdownText": markdownText } });
            }
        });
    }
    static updateLeafMD(treeId, markdownText, leafId) {
        return __awaiter(this, void 0, void 0, function* () {
            let markdown = yield mongo_1.DBMarkdown.findOne({ leafId: leafId });
            if (!markdown) {
                yield Markdown.createLeafMD(treeId, markdownText, leafId);
            }
            else {
                yield mongo_1.DBMarkdown.findOneAndUpdate({ leafId: leafId }, { $set: { "markdownText": markdownText } });
            }
        });
    }
    static getMarkdownByNodeId(nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield mongo_1.DBMarkdown.findOne({ leafId: nodeId });
            if (record === null) {
                record = yield mongo_1.DBMarkdown.findOne({ branchId: nodeId });
            }
            if (record === null) {
                throw new Error('There is no markdown in this node');
            }
            return new Markdown(undefined, record === null || record === void 0 ? void 0 : record.markdownText);
        });
    }
}
exports.default = Markdown;
