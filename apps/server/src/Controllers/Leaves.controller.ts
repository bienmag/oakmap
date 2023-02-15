// import { Request, Response, NextFunction } from "express";
// import Leaf from "../Models/Leaves";
// import { DBTree } from "../lib/mongo";
// import Markdown from "../Models/Markdowns";

// const mongodb = require('mongodb')

// const LeavesController = {

//   async createLeaf(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { leafId, branchId, treeId, position, leafName, markdownText } = req.body
//       //create leaf in db
//       const leaf = await Leaf.create(leafId, branchId, treeId, position, leafName, markdownText)
//       //create markdown in db
//       const markdown = await Markdown.create(treeId, markdownText, branchId, leafId)
//       res.status(201).json(leaf)


//       // INSERT leaf into the tree 
//       const id = new mongodb.ObjectId(treeId)
//       await DBTree.findOneAndUpdate({ _id: id, "branches.branchId": branchId }, { $push: { "branches.$.leaves": leaf } })
//     }

//     catch (e) {
//       next(e)
//     }
//   }
  // ,

  // async getMarkdown(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     //this should be req params
  //     const { leafId } = req.params
  //     console.log('leaf id for markdown', leafId)
  //     console.log('trying to get leaf markdown')
  //     const markdown = await Markdown.getMarkdownByNodeId(leafId)
  //     res.json(markdown)
  //   }
  //   catch (e) {
  //     next(e)
  //   }
  // }

// }

// export default LeavesController
