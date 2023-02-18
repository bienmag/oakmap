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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trees_1 = __importDefault(require("../Models/Trees"));
const Branches_1 = __importDefault(require("../Models/Branches"));
const mongodb = require('mongodb');
const mongo_1 = require("../lib/mongo");
const Markdowns_1 = __importDefault(require("../Models/Markdowns"));
const Leaves_1 = __importDefault(require("../Models/Leaves"));
const mongodb_1 = require("mongodb");
const TreesController = {
    // create tree
    createTree(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { treeName, user } = req.body;
                const date = new Date();
                const branches = [];
                const unlinkedLeaves = [];
                //user should be from req.user but since we don't have it yet it will come from req.body
                // const { user } = req.user
                const treeId = new mongodb_1.ObjectId();
                const tree = yield Trees_1.default.create(treeId, date, treeName, user, branches, unlinkedLeaves);
                res.status(201).json(tree);
            }
            catch (e) {
                next(e);
            }
        });
    },
    // update a tree
    updateTree(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { treeName, description } = req.body;
                const { treeId } = req.params;
                const tree = yield Trees_1.default.update(treeId, treeName, description);
                res.status(201).json(tree);
            }
            catch (e) {
                next(e);
            }
        });
    },
    // create a branch
    createBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // do not create node model
                // create branch and leaf OBJECT with no id 
                //create MARKDOWN inside that branch or leaf model (seperate document)
                //treeId should come from req.params!
                //nodeID ??????
                const { treeId } = req.params;
                const { branchId, position } = req.body;
                const leaves = [];
                const branch = yield Branches_1.default.create(branchId, treeId, position, leaves);
                // const markdown = await Markdown.create(treeId, branchId)
                res.status(201).json(branch);
                // INSERT branch into the tree 
                const id = new mongodb.ObjectId(treeId);
                yield mongo_1.DBTree.findOneAndUpdate({ _id: id }, { $push: { branches: branch } });
            }
            catch (e) {
                next(e);
            }
        });
    },
    //create a leaf 
    createLeaf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { treeId } = req.params;
                const { leafId, position } = req.body;
                //create leaf in db
                const leaf = yield Leaves_1.default.create(leafId, treeId, position);
                // //create markdown in db
                // const markdown = await Markdown.create(treeId, leafId)
                res.status(201).json(leaf);
                // insert the leaf into the tree
                const id = new mongodb.ObjectId(treeId);
                yield mongo_1.DBTree.findOneAndUpdate({ _id: id }, { $push: { unlinkedLeaves: leaf } });
            }
            catch (e) {
                next(e);
            }
        });
    },
    // update a branch
    updateBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { treeId } = req.params;
                const { branchId, position, branchName, markdownText } = req.body;
                const branch = yield Branches_1.default.update(branchId, treeId, position, branchName);
                res.status(201).json(branch);
                if (markdownText) {
                    console.log('here', markdownText);
                    yield Markdowns_1.default.updateBranchMD(treeId, markdownText, branchId);
                }
            }
            catch (e) {
                next(e);
            }
        });
    },
    linkUnlink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { treeId } = req.params;
                const { branchId, leafId } = req.body;
                const branch = yield Branches_1.default.linkUnlink(treeId, branchId, leafId);
                const leaf = yield Leaves_1.default.linkUnlink(treeId, branchId, leafId);
                res.status(201).json(branch);
            }
            catch (e) {
                next(e);
            }
        });
    },
    // // INSERT leaf into the BRANCH!!!!!
    // const id = new mongodb.ObjectId(treeId)
    // await DBTree.findOneAndUpdate({ _id: id, "branches.branchId": branchId }, { $push: { "branches.$.leaves": leaf } })
    // update a leaf
    updateLeaf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { treeId } = req.params;
                const { leafId, position, leafName, branchId, markdownText } = req.body;
                const leaf = yield Leaves_1.default.update(leafId, treeId, position, leafName, branchId);
                res.status(201).json(leaf);
                if (markdownText) {
                    yield Markdowns_1.default.updateLeafMD(treeId, markdownText, leafId);
                }
            }
            catch (e) {
                next(e);
            }
        });
    },
    // get a single tree
    getTree(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const tree = yield Trees_1.default.getTreeById(id);
                res.json(tree);
            }
            catch (e) {
                next(e);
            }
        });
    },
    // get all trees
    getAll(_, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trees = yield Trees_1.default.getAll();
                res.json(trees);
            }
            catch (e) {
                next(e);
            }
        });
    },
    // get markdown (nodeid is needed)
    getMarkdown(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nodeId } = req.params;
                const markdown = yield Markdowns_1.default.getMarkdownByNodeId(nodeId);
                res.json(markdown);
            }
            catch (e) {
                next(e);
            }
        });
    },
    // delete a branch 
    deleteBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { branchId } = req.params;
                yield Branches_1.default.deleteBranch(branchId);
                res.json('The branch has been sucsessfully deleted');
            }
            catch (e) {
                next(e);
            }
        });
    },
    // // delete a leaf 
    // async deleteLeaf(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const { leafId } = req.params
    //     await Leaf.deleteLead(leafId)
    //     res.json('The leaf has been sucsessfully deleted')
    //   }
    // }
};
exports.default = TreesController;
