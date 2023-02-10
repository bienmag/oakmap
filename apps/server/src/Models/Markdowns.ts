import { DBMarkdown } from "../lib/mongo";
import { ObjectId } from "mongodb"

class Markdown {
  constructor(
    public treeId?: string,
    public markdownText?: string,
    public branchId?: string,
    public leafId?: string,
  ) { }


  static async create(
    treeId: string,
    markdownText: string,
    branchId?: string,
    leafId?: string,
  ) {



    const markdownId = new ObjectId()

    leafId === undefined ? (await DBMarkdown.create({
      markdownId, treeId, markdownText, branchId
    })
    ) : (await DBMarkdown.create({
      markdownId, treeId, markdownText, leafId
    })
    )




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