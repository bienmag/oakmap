import express from "express";
// import BranchesController from "./Controllers/Branches.controller";
// import LeavesController from "./Controllers/Leaves.controller";
import TreesController from "./Controllers/Trees.controller";
// import MarkdownsController from "./Controllers/Markdowns.controller";

const router = express.Router()

router.post('/trees', TreesController.createTree)
router.put('/trees/:treeId', TreesController.updateTree)
router.post('/trees/:treeId/branches', TreesController.createBranch)
router.put('/trees/:treeId/branches', TreesController.updateBranch)
router.post('/trees/:treeId/unlinkedLeaves', TreesController.createLeaf)
router.put('/trees/:treeId/unlinkedLeaves/', TreesController.updateLeaf)
router.put('/trees/:treeId/leaves/', TreesController.linkUnlink)
router.get('/trees/:id', TreesController.getTree)
router.get('/trees', TreesController.getAll)
router.get('/markdown/:nodeId', TreesController.getMarkdown)
router.delete('/trees/:id/branches/:branchId', TreesController.deleteBranch)

export default router;