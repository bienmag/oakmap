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
class Branch {
    constructor(branchId, treeId, position, branchName, leaves) {
        this.branchId = branchId;
        this.treeId = treeId;
        this.position = position;
        this.branchName = branchName;
        this.leaves = leaves;
    }
    static create(branchId, treeId, position, leaves) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Branch(branchId, treeId, position, undefined, leaves);
        });
    }
    static update(branchId, treeId, position, branchName) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            const tree = yield mongo_1.DBTree.findOneAndUpdate({
                _id: id, "branches.branchId": branchId
            }, {
                $set: {
                    "branches.$.position": position,
                    "branches.$.branchName": branchName
                }
            }, { new: true });
            return new Branch(branchId, treeId, position, branchName);
        });
    }
    static linkUnlink(treeId, branchId, leafId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongodb.ObjectId(treeId);
            if (branchId === "") {
                // if branchId  is not provided -> look for the leaf inside tree.branches.leaves -> delete it from there -> push it to unlinkedLeaves
                let tree = yield mongo_1.DBTree.findOne({ _id: id });
                if (!tree) {
                    throw new Error('There is no tree with this tree id');
                }
                //looking for the leaf inside tree.branches
                let foundLeaf;
                for (const branch of tree.branches) {
                    if (branch.leaves !== null) {
                        for (const leaf of branch.leaves) {
                            if (leaf.leafId === leafId) {
                                //the leaf is found!
                                foundLeaf = leaf;
                                // deleting the leaf from the branch where it's found and setting leaf.branchId to ""
                                let branchId = foundLeaf.branchId;
                                yield mongo_1.DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": branchId, "leaves": { $elemMatch: { "leafId": leafId } } } } }, { $pull: { "branches.$.leaves": leaf } });
                                foundLeaf.branchId = "";
                                // pushing the leaf to unlinkedLeaves
                                yield mongo_1.DBTree.findOneAndUpdate({ _id: id }, { $push: { unlinkedLeaves: leaf } });
                                // the leaf with the leafId is not found in the branches.leaves  
                                if (branchId !== null) {
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        throw new Error('Branch.leaves is null');
                    }
                    if (foundLeaf) {
                        break;
                    }
                }
                if (!foundLeaf) {
                    throw new Error('No leaf was found in this tree with the leafId');
                }
                // this is if both branchId and leafId received in the request
            }
            else {
                // the leaf can be: 1) inside some branches.leaves 2) inside unlinkedLeaves
                let tree = yield mongo_1.DBTree.findOne({ _id: id });
                if (!tree) {
                    throw new Error('There is no tree with this tree id');
                }
                // looking for the leaf
                let foundLeaf;
                // looking for the leaf inside unlinkedLeaves
                if (tree.unlinkedLeaves !== null) {
                    for (const leaf of tree.unlinkedLeaves) {
                        if (leaf.leafId === leafId) {
                            // the leaf found in the unlinkedLeaves
                            foundLeaf = leaf;
                            //delete if from there
                            yield mongo_1.DBTree.findOneAndUpdate({ _id: id, "unlinkedLeaves": { $elemMatch: { "leafId": leafId } } }, { $pull: { "unlinkedLeaves": leaf } });
                            //push to the branch with branchId
                            foundLeaf.branchId = branchId;
                            yield mongo_1.DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": branchId } } }, { $push: { "branches.$.leaves": leaf } });
                        }
                        else {
                            console.error('The leaf was not found in the unlinkedLeaves');
                        }
                    }
                    if (!foundLeaf) {
                        // means that the leaf is already inside some branch
                        for (const branch of tree.branches) {
                            if (branch.leaves !== null) {
                                for (const leaf of branch.leaves) {
                                    if (leaf.leafId === leafId) {
                                        //leaf found
                                        foundLeaf = leaf;
                                        //delete it from that branch
                                        let prevBranchId = foundLeaf.branchId;
                                        if (branchId !== null) {
                                            yield mongo_1.DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": prevBranchId, "leaves": { $elemMatch: { "leafId": leafId } } } } }, { $pull: { "branches.$.leaves": leaf } });
                                            //push to the new branch and change its branchId
                                            foundLeaf.branchId = branchId;
                                            yield mongo_1.DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": branchId } } }, { $push: { "branches.$.leaves": leaf } });
                                            break;
                                        }
                                    }
                                }
                            }
                            else {
                                throw new Error('Branch.leaves is null');
                            }
                            if (foundLeaf) {
                                break;
                            }
                        }
                    }
                    if (!foundLeaf) {
                        throw new Error('No leaf was found in this tree with the leafId');
                    }
                }
            }
            return;
        });
    }
    static deleteBranch(branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            let tree = yield mongo_1.DBTree.findOne({ branchId: branchId });
            if (tree === null)
                return;
            tree.branches = tree === null || tree === void 0 ? void 0 : tree.branches.filter(function (branch) {
                return branch.branchId !== branchId;
            });
            yield (tree === null || tree === void 0 ? void 0 : tree.save());
            return;
        });
    }
}
exports.default = Branch;
