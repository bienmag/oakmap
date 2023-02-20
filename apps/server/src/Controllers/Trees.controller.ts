import { Request, Response, NextFunction } from "express";
import Tree from "../Models/Trees";
import Branch from "../Models/Branches";
const mongodb = require('mongodb');
import { DBTree } from "../lib/mongo";
import Markdown from "../Models/Markdowns";
import Leaf from "../Models/Leaves";
import { ObjectId } from "mongodb";
import Edge from "../Models/Edges";
import { mongo } from "mongoose";
import User from "../Models/Users";


const TreesController = {


  // create tree
  async createTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeName, user, username, userpic } = req.body
      const date = new Date()
      const branches: object[] = []
      const unlinkedLeaves: object[] = []
      const edges: object[] = []
      //user should be from req.user but since we don't have it yet it will come from req.body
      // @ts-ignore
      // const { user } = req.user

      const treeId = new ObjectId()
      const root = {
        id: "root",
        treeId: `${treeId}`,
        position: {
          x: 0, y: 0
        },
        type: 'root',
        label: 'root'
      }
      const tree = await Tree.create(treeId, treeName, root, date, user, branches, unlinkedLeaves, edges, username)

      const id = new mongodb.ObjectId(treeId)
      await User.update(user, id)
      res.status(201).json(tree)
    }
    catch (e) { next(e) }
  },

  // update a tree
  async updateTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeName, description, edges } = req.body
      const { treeId } = req.params
      const tree = await Tree.update(treeId, treeName, description, edges)
      res.status(201).json(tree)
    } catch (e) {
      next(e)
    }
  },


  // create a branch
  async createBranch(req: Request, res: Response, next: NextFunction) {
    try {
      // do not create node model
      // create branch and leaf OBJECT with no id 
      //create MARKDOWN inside that branch or leaf model (seperate document)

      //treeId should come from req.params!
      //nodeID ??????
      const { treeId } = req.params
      const { branchId, position, type } = req.body
      const leaves: object[] = []
      const branch = await Branch.create(branchId, treeId, position, type, leaves)
      res.status(201).json(branch)

      // INSERT branch into the tree 
      const id = new mongodb.ObjectId(treeId)
      await DBTree.findOneAndUpdate({ _id: id }, { $push: { branches: branch } })
    }
    catch (e) {
      next(e)
    }
  },


  //create a leaf 
  async createLeaf(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { leafId, position, type } = req.body
      //create leaf in db
      const leaf = await Leaf.create(leafId, treeId, position, type)


      // //create markdown in db
      // const markdown = await Markdown.create(treeId, leafId)

      res.status(201).json(leaf)


      // insert the leaf into the tree
      const id = new mongodb.ObjectId(treeId)
      await DBTree.findOneAndUpdate({ _id: id }, { $push: { unlinkedLeaves: leaf } })
    }

    catch (e) {
      next(e)
    }
  },
  // update a branch
  async updateBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { branchId, position, branchName, markdownText, type } = req.body

      const branch = await Branch.update(branchId, treeId, position, type, branchName)
      res.status(201).json(branch)

      if (markdownText) {
        console.log('here', markdownText)
        await Markdown.updateBranchMD(treeId, markdownText, branchId)
      }

    } catch (e) {
      next(e)
    }
  },

  async linkUnlink(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { branchId, leafId } = req.body

      const result = await Branch.linkUnlink(treeId, branchId, leafId)


      res.status(201).json(result)
    }
    catch (e) {
      next(e)
    }
  },

  // // INSERT leaf into the BRANCH!!!!!
  // const id = new mongodb.ObjectId(treeId)
  // await DBTree.findOneAndUpdate({ _id: id, "branches.branchId": branchId }, { $push: { "branches.$.leaves": leaf } })




  // update a leaf
  async updateLeaf(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { leafId, position, leafName, branchId, markdownText, type } = req.body

      const leaf = await Leaf.update(leafId, treeId, position, type, leafName, branchId)

      res.status(201).json(leaf)

      if (markdownText) {
        await Markdown.updateLeafMD(treeId, markdownText, leafId)
      }

    }

    catch (e) {
      next(e)
    }

  },


  // get a single tree
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const tree = await Tree.getTreeById(id)
      res.json(tree)
    } catch (e) {
      next(e)
    }
  },


  // get all trees
  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const trees = await Tree.getAll()
      res.json(trees)
    } catch (e) {
      next(e)
    }
  },


  // get markdown (nodeid is needed)
  async getMarkdown(req: Request, res: Response, next: NextFunction) {
    try {
      const { nodeId } = req.params
      const markdown = await Markdown.getMarkdownByNodeId(nodeId)
      res.json(markdown)
    }
    catch (e) {
      next(e)
    }
  },

  // delete a branch 
  async deleteBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { branchId } = req.body
      await Branch.deleteBranch(treeId, branchId)
      res.json('The branch was deleted successfully')
    }
    catch (e) {
      next(e)
    }
  },

  // delete a leaf 
  async deleteLeaf(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { leafId } = req.body
      await Leaf.deleteLeaf(treeId, leafId)
      res.json('The leaf has been sucsessfully deleted')
    } catch (e) {
      next(e)
    }
  },

  // create an edge
  async createEdge(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { edgeId, source, sourceHandle, target, targetHandle, type } = req.body
      const edge = await Edge.create(edgeId, source, sourceHandle, target, targetHandle, type)
      res.status(201).json(edge)

      const id = new mongodb.ObjectId(treeId)
      await DBTree.findOneAndUpdate({ _id: id }, { $push: { edges: edge } })
    }
    catch (e) {
      next(e)
    }
  },

  // update an edge
  async updateEdge(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { edgeId, source, sourceHandle, target, targetHandle, type } = req.body
      const edge = await Edge.update(treeId, edgeId, source, sourceHandle, target, targetHandle, type)
      res.status(201).json(edge)
    } catch (e) {
      next(e)
    }
  },

  // delete an edge

  async deleteEdge(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { edgeId, source, sourceHandle, target, targetHandle, type } = req.body
      const edge = await Edge.delete(treeId, edgeId, source, sourceHandle, target, targetHandle, type)
      res.status(201).json(edge)
    } catch (e) {
      next(e)
    }
  },

  async getEdges(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const edges = await Edge.getAll(treeId)
      res.status(201).json(edges)
    } catch (e) {
      next(e)
    }
  },

  async getUserTrees(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const trees = await DBTree.find({ user: userId })
      res.status(201).json(trees)
    } catch (e) {
      next(e)
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const _id = new ObjectId()
      const { userId, email, accessToken } = req.body
      const user = await User.create(_id, userId, email, accessToken)
      console.log('user from controller', user)
      res.status(201).json(user)
    }
    catch (e) {
      next(e)
    }
  }

}




export default TreesController