import { DBMarkdown, DBTree } from "../lib/mongo";
import { ObjectId } from "mongodb";

class Leaf {
  constructor(
    public leafId: string,
    public treeId: string,
    public position: object,
    public leafName?: string,
    public branchId?: string,
  ) { }

  static async create(
    leafId: string,
    treeId: string,
    position: object,
  ): Promise<Leaf> {

    return new Leaf(leafId, treeId, position)
  }

  static async update(
    leafId: string,
    treeId: string,
    position: object,
    leafName?: string,
    branchId?: string
  ): Promise<Leaf> {
    return new Leaf(leafId, treeId, position, leafName, branchId)
  }



  static async deleteLeaf(leafId: string) {
    let tree = await DBTree.findOne({ leafId: leafId })
    tree?.branches
  }
}



export default Leaf