// import { Request, Response, NextFunction } from "express";
// import Markdown from "../Models/Markdowns";

// const MarkdownsController = {

//   async getMarkdown(req: Request, res: Response, next: NextFunction) {
//     try {
//       //this should be req params
//       const { nodeId } = req.params
//       console.log('leaf id should be here', nodeId)
//       const markdown = await Markdown.getMarkdownByNodeId(nodeId)
//       res.json(markdown)
//     }
//     catch (e) {
//       next(e)
//     }
//   }
// }
// export default MarkdownsController