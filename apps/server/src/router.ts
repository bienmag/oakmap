import express from "express";
import TreesController from "./Controllers/Trees.controller";
import User from "./Models/Users";



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
router.delete('/trees/:treeId/branches/', TreesController.deleteBranch)
router.delete('/trees/:treeId/leaves/', TreesController.deleteLeaf)
router.post('/trees/:treeId/edges', TreesController.createEdge)
router.get('/trees/:treeId/edges', TreesController.getEdges)
router.put('/trees/:treeId/edges', TreesController.updateEdge)
router.delete('/trees/:treeId/edges', TreesController.deleteEdge)
router.get('/users/:userId/trees', TreesController.getUserTrees)
router.post('/users', TreesController.createUser)




export default router
