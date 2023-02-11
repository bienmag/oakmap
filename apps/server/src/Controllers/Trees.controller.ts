import { Request, Response, NextFunction } from "express";
import Tree from "../Models/Trees";
import Branch from "../Models/Branches";
const mongodb = require('mongodb');
import { DBTree } from "../lib/mongo";
import Markdown from "../Models/Markdowns";
import Leaf from "../Models/Leaves";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


const TreesController = {


  // create tree
  async createTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeName, description, user } = req.body
      const date = new Date()
      const branches: object[] = []
      const unlinkedLeaves: object[] = []

      //user should be from req.user but since we don't have it yet it will come from req.body
      // @ts-ignore
      // const { user } = req.user


      const treeId = new ObjectId()
      const tree = await Tree.create(treeId, date, treeName, user, description, branches, unlinkedLeaves)
      res.status(201).json(tree)
    }
    catch (e) { next(e) }
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
      const { branchId, position } = req.body
      const leaves: object[] = []
      const branch = await Branch.create(branchId, treeId, position, leaves)
      // const markdown = await Markdown.create(treeId, branchId)
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
      const { leafId, position } = req.body
      //create leaf in db
      const leaf = await Leaf.create(leafId, treeId, position)


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
      const { branchId, position, branchName, markdown } = req.body

      const branch = await Branch.update(branchId, treeId, position, branchName)
      res.status(201).json(branch)

      if (markdown) {
        await Markdown.create(treeId, branchId)
      }

    } catch (e) {
      next(e)
    }
  },

  async linkUnlink(req: Request, res: Response, next: NextFunction) {
    try {
      const { treeId } = req.params
      const { branchId, leafId } = req.body

      const branch = await Branch.linkUnlink(treeId, branchId, leafId)
      const leaf = await Leaf.linkUnlink(treeId, branchId, leafId)


      res.status(201).json(branch)
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
      const { leafId, position, leafName, branchId, markdown } = req.body

      const leaf = await Leaf.update(leafId, treeId, position, leafName, branchId)

      res.status(201).json(leaf)

      if (markdown) {
        await Markdown.create(treeId, leafId)
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
      const { branchId } = req.params
      await Branch.deleteBranch(branchId)
      res.json('The branch has been sucsessfully deleted')
    }
    catch (e) {
      next(e)
    }
  },

  // // delete a leaf 
  // async deleteLeaf(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { leafId } = req.params
  //     await Leaf.deleteLead(leafId)
  //     res.json('The leaf has been sucsessfully deleted')
  //   }
  // }


}




export default TreesController