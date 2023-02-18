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
class Leaf {
    constructor(leafId, treeId, position, leafName, branchId) {
        this.leafId = leafId;
        this.treeId = treeId;
        this.position = position;
        this.leafName = leafName;
        this.branchId = branchId;
    }
    static create(leafId, treeId, position) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Leaf(leafId, treeId, position);
        });
    }
    static update(leafId, treeId, position, leafName, branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            let update = {};
            if (position)
                update['position'] = position;
            if (leafName)
                update['leafName'] = leafName;
            if (branchId)
                update['branchId'] = branchId;
            const id = new mongodb.ObjectId(treeId);
            // let tree = await DBTree.findById({ _id: id, "unlinkedLeaves.leafId": leafId })
            // if (!tree) {
            //   throw new Error("There is no leaf with this leafId in the tree")
            // const tree = await DBTree.findById({ _id: id, branches: { $elemMatch: { branchId: branchId, leaves: { $elemMatch: { leafId: leafId } } } } })
            // WORKING TO UPDAATE THE LEaF IN UNLINKED LEAVES!!!!!!!!!!!! can try to use this  { $set: update },
            const tree = yield mongo_1.DBTree.findOneAndUpdate({
                _id: id, "unlinkedLeaves.leafId": leafId
            }, {
                $set: {
                    "unlinkedLeaves.$.position": position,
                    "unlinkedLeaves.$.leafName": leafName,
                    "unlinkedLeaves.$.branchId": branchId
                }
            }, { new: true });
            return new Leaf(leafId, treeId, position, leafName, branchId);
        });
    }
    static linkUnlink(treeId, branchId, leafId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (branchId === null) {
                // i have to unlink the leaf and push it to unlinkedLeaves
            }
            else {
                // link leaf to the branch
            }
        });
    }
    static deleteLeaf(leafId) {
        return __awaiter(this, void 0, void 0, function* () {
            let tree = yield mongo_1.DBTree.findOne({ leafId: leafId });
            tree === null || tree === void 0 ? void 0 : tree.branches;
        });
    }
}
exports.default = Leaf;
