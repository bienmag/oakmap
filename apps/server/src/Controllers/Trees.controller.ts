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
      const { treeName, description, user, branches } = req.body
      const date = new Date()

      //user should be from req.user but since we don't have it yet it will come from req.body
      // @ts-ignore
      // const { user } = req.user

      // @ts-ignore
      const treeId = new ObjectId()
      console.log(typeof treeId)

      const tree = await Tree.create(treeId, date, treeName, user, description, branches)
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

      const { branchId, treeId, position, branchName, markdownText, leaves } = req.body
      const branch = await Branch.create(branchId, treeId, position, branchName, leaves, markdownText)
      const markdown = await Markdown.create(treeId, markdownText, branchId)
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
      const { leafId, branchId, treeId, position, leafName, markdownText } = req.body
      //create leaf in db
      const leaf = await Leaf.create(leafId, branchId, treeId, position, leafName, markdownText)
      //create markdown in db
      const markdown = await Markdown.create(treeId, markdownText, branchId, leafId)
      res.status(201).json(leaf)


      // INSERT leaf into the tree 
      const id = new mongodb.ObjectId(treeId)
      await DBTree.findOneAndUpdate({ _id: id, "branches.branchId": branchId }, { $push: { "branches.$.leaves": leaf } })
    }

    catch (e) {
      next(e)
    }
  },

  // get a single tree
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      console.log('tree id from req params', typeof id)
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
      console.log('leaf id should be here', nodeId)
      const markdown = await Markdown.getMarkdownByNodeId(nodeId)
      res.json(markdown)
    }
    catch (e) {
      next(e)
    }
  }



}




export default TreesController