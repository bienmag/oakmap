import { DBMarkdown } from "../lib/mongo";
import { ObjectId } from "mongodb";

class Leaf {
  constructor(
    public leafId: string,
    public branchId: string,
    public treeId: string,
    public position: object,
    public leafName: string
  ) { }

  static async create(
    leafId: string,
    branchId: string,
    treeId: string,
    position: object,
    leafName: string,
    markdownText?: string
  ): Promise<Leaf> {



    return new Leaf(leafId, branchId, treeId, position, leafName)
  }
}



export default Leaf