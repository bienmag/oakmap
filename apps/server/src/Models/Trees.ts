import { DBTree } from "../lib/mongo"
const mongodb = require('mongodb');


class Tree {
  constructor(
    public _id: object,
    public treeName: string | undefined,
    public date?: object,
    public user?: string,
    public branches?: Array<object>,
    public unlinkedLeaves?: Array<object>,
    public description?: string,
    public edges?: Array<object>
  ) { }



  static async create(
    _id: object,
    date: object,
    treeName: string,
    user: string,
    branches: Array<object>,
    unlinkedLeaves: Array<object>,
    edges: Array<object>
  ): Promise<Tree> {

    await DBTree.create({
      _id, treeName, date, user, branches, unlinkedLeaves, edges
    })

    return new Tree(_id, treeName, date, user, branches, unlinkedLeaves, undefined, edges)
  }

  static async getAll(): Promise<Tree[]> {
    return await DBTree.find({})
  }


  static async update(
    treeId: string,
    treeName: string,
    description: string,
    edges: Array<object>
  ): Promise<Tree> {

    const id = new mongodb.ObjectId(treeId)

    let tree = await DBTree.findOne({ _id: id })
    await DBTree.findOneAndUpdate({ _id: id }, { $set: { "treeName": treeName, "description": description, "edges": edges } })
    return new Tree(id, treeName, tree?.date, tree?.user, tree?.branches, tree?.unlinkedLeaves, description, edges)
  }

  static async getTreeById(treeId: string): Promise<Tree> {
    const id = new mongodb.ObjectId(treeId)

    let record = await DBTree.findOne({ _id: id })
    console.log('this is my tree', record)
    if (record === null) {
      throw new Error('There is no tree with this id')
    }
    const { _id, treeName, date, user, branches, unlinkedLeaves, description, edges } = record

    return new Tree(_id, treeName, date, user, branches, unlinkedLeaves, description, edges)
  }
}


export default Tree