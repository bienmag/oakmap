// import { Request, Response, NextFunction } from "express";
// import Branch from "../Models/Branches";
// import { DBTree } from "../lib/mongo"
// import Markdown from "../Models/Markdowns";


// const mongodb = require('mongodb');

// const BranchesController = {


//   async createBranch(req: Request, res: Response, next: NextFunction) {
//     try {
//       // do not create node model
//       // create branch and leaf OBJECT with no id 
//       //create MARKDOWN inside that branch or leaf model (seperate document)

//       //treeId should come from req.params!
//       //nodeID ??????

//       const { branchId, treeId, position, branchName, markdownText, leaves } = req.body
//       const branch = await Branch.create(branchId, treeId, position, branchName, leaves, markdownText)
//       const markdown = await Markdown.create(treeId, markdownText, branchId)
//       res.status(201).json(branch)

//       // INSERT branch into the tree 
//       const id = new mongodb.ObjectId(treeId)
//       await DBTree.findOneAndUpdate({ _id: id }, { $push: { branches: branch } })
//     }
//     catch (e) {
//       next(e)
//     }
//   }

  



// }


// export default BranchesController