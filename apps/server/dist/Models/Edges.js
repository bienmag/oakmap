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
class Edge {
    constructor(edgeId, source, sourceHandle, target, targetHandle, type) {
        this.edgeId = edgeId;
        this.source = source;
        this.sourceHandle = sourceHandle;
        this.target = target;
        this.targetHandle = targetHandle;
        this.type = type;
    }
    static create(edgeId, source, sourceHandle, target, targetHandle, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Edge(edgeId, source, sourceHandle, target, targetHandle, type);
        });
    }
    static getAll(treeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            const tree = yield mongo_1.DBTree.findOne({ _id: id });
            if (tree === null) {
                throw new Error('The tree is not found');
            }
            return tree.edges;
        });
    }
    static update(treeId, edgeId, source, sourceHandle, target, targetHandle, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            yield mongo_1.DBTree.findByIdAndUpdate({ _id: id, "edges.edgeId": edgeId }, {
                $set: {
                    "edges.$.source": source,
                    "edges.$.target": target,
                    "edges.$.type": type,
                }
            }, { new: true });
            return new Edge(edgeId, source, sourceHandle, target, targetHandle, type);
        });
    }
    static delete(treeId, edgeId, source, sourceHandle, target, targetHandle, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            let tree = yield mongo_1.DBTree.findOne({ _id: id, "edges": { $elemMatch: { "edgeId": edgeId } } });
            if (tree === null) {
                throw new Error("The edge is not found in this tree");
            }
            tree.edges = tree.edges.filter(function (edge) {
                return edge.edgeId !== edgeId;
            });
            yield tree.save();
            return 'The edge was successfully deleted';
        });
    }
}
exports.default = Edge;
