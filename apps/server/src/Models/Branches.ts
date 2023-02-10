import { DBMarkdown } from "../lib/mongo";
import { ObjectId } from "mongodb";


class Branch {
  constructor(
    public branchId: string,
    public treeId: string,
    public position: object,
    public branchName: string,
    public leaves: Array<object>,
  ) { }

  static async create(
    branchId: string,
    treeId: string,
    position: object,
    branchName: string,
    leaves: Array<object>,
    markdownText: string
  ): Promise<Branch> {




    return new Branch(branchId, treeId, position, branchName, leaves)
  }


}



export default Branch