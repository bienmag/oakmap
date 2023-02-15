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
const mongodb = require('mongodb');
class Tree {
    constructor(_id, treeName, date, user, branches, unlinkedLeaves, description) {
        this._id = _id;
        this.treeName = treeName;
        this.date = date;
        this.user = user;
        this.branches = branches;
        this.unlinkedLeaves = unlinkedLeaves;
        this.description = description;
    }
    static create(_id, date, treeName, user, branches, unlinkedLeaves) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_1.DBTree.create({
                _id, treeName, date, user, branches, unlinkedLeaves
            });
            return new Tree(_id, treeName, date, user, branches, unlinkedLeaves);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_1.DBTree.find({});
        });
    }
    static update(treeId, treeName, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            let tree = yield mongo_1.DBTree.findOne({ _id: id });
            yield mongo_1.DBTree.findOneAndUpdate({ _id: id }, { $set: { "treeName": treeName, "description": description } });
            return new Tree(id, treeName, tree === null || tree === void 0 ? void 0 : tree.date, tree === null || tree === void 0 ? void 0 : tree.user, tree === null || tree === void 0 ? void 0 : tree.branches, tree === null || tree === void 0 ? void 0 : tree.unlinkedLeaves, description);
        });
    }
    static getTreeById(treeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            let record = yield mongo_1.DBTree.findOne({ _id: id });
            if (record === null) {
                throw new Error('There is no tree with this id');
            }
            const { _id, treeName, date, user, description, branches, unlinkedLeaves } = record;
            return new Tree(_id, treeName, date, user, branches, unlinkedLeaves, description);
        });
    }
}
exports.default = Tree;
