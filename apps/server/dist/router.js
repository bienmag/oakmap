"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import BranchesController from "./Controllers/Branches.controller";
// import LeavesController from "./Controllers/Leaves.controller";
const Trees_controller_1 = __importDefault(require("./Controllers/Trees.controller"));
// import MarkdownsController from "./Controllers/Markdowns.controller";
const router = express_1.default.Router();
router.post('/trees', Trees_controller_1.default.createTree);
router.put('/trees/:treeId', Trees_controller_1.default.updateTree);
router.post('/trees/:treeId/branches', Trees_controller_1.default.createBranch);
router.put('/trees/:treeId/branches', Trees_controller_1.default.updateBranch);
router.post('/trees/:treeId/unlinkedLeaves', Trees_controller_1.default.createLeaf);
router.put('/trees/:treeId/unlinkedLeaves/', Trees_controller_1.default.updateLeaf);
router.put('/trees/:treeId/leaves/', Trees_controller_1.default.linkUnlink);
router.get('/trees/:id', Trees_controller_1.default.getTree);
router.get('/trees', Trees_controller_1.default.getAll);
router.get('/markdown/:nodeId', Trees_controller_1.default.getMarkdown);
router.delete('/trees/:id/branches/:branchId', Trees_controller_1.default.deleteBranch);
exports.default = router;
