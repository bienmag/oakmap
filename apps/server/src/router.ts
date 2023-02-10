import express from "express";
// import BranchesController from "./Controllers/Branches.controller";
// import LeavesController from "./Controllers/Leaves.controller";
import TreesController from "./Controllers/Trees.controller";
// import MarkdownsController from "./Controllers/Markdowns.controller";

const router = express.Router()

router.post('/trees', TreesController.createTree)
router.post('/trees/:id/branches', TreesController.createBranch)
router.post('/trees/:treeId/unlinkedLeaves', TreesController.createLeaf)
router.get('/trees/:id', TreesController.getTree)
router.get('/trees', TreesController.getAll)
router.get('/markdown/:nodeId', TreesController.getMarkdown)
router.delete('/trees/:id/branches/:branchId', TreesController.deleteBranch)

export default router;