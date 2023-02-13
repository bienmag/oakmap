import { DBMarkdown } from "../lib/mongo";
import { ObjectId } from "mongodb"

class Markdown {
  constructor(
    public treeId?: string,
    public markdownText?: string,
    public branchId?: string,
    public leafId?: string,
  ) { }


  static async createBranchMD(
    treeId: string,
    markdownText: string,
    branchId?: string,
  ) {
    const markdownId = new ObjectId()

    await DBMarkdown.create({
      markdownId, treeId, markdownText, branchId
    })
  }


  static async createLeafMD(
    treeId: string,
    markdownText: string,
    leafId?: string,
  ) {
    const markdownId = new ObjectId()

    await DBMarkdown.create({
      markdownId, treeId, markdownText, leafId
    })

  }



  static async updateBranchMD(
    treeId: string,
    markdownText: string,
    branchId: string
  ) {

    let markdown = await DBMarkdown.findOne({ branchId: branchId })
    if (!markdown) {
      await Markdown.createBranchMD(treeId, markdownText, branchId)
    } else {
      await DBMarkdown.findOneAndUpdate({ branchId: branchId }, { $set: { "markdownText": markdownText } })
    }
  }

  static async updateLeafMD(
    treeId: string,
    markdownText: string,
    leafId: string
  ) {

    let markdown = await DBMarkdown.findOne({ leafId: leafId })
    if (!markdown) {
      await Markdown.createLeafMD(treeId, markdownText, leafId)
    } else {
      await DBMarkdown.findOneAndUpdate({ leafId: leafId }, { $set: { "markdownText": markdownText } })
    }
  }

  static async getMarkdownByNodeId(nodeId: string) {
    //@ts-ignore
    let record = await DBMarkdown.findOne({ leafId: nodeId })


    if (record === null) {
      record = await DBMarkdown.findOne({ branchId: nodeId })
    }
    if (record === null) {
      throw new Error('There is no markdown in this node')
    }

    return new Markdown(undefined, record?.markdownText)
  }


}
export default Markdown