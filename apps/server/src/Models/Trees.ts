
import { DBTree } from "../lib/mongo"
const mongodb = require('mongodb');


class Tree {
  constructor(
    public _id: object,
    public treeName: string,
    public date?: object,
    public user?: string,
    public branches?: Array<object>,
    public unlinkedLeaves?: Array<object>,
    public description?: string
  ) { }



  static async create(
    _id: object,
    date: object,
    treeName: string,
    user: string,
    branches: Array<object>,
    unlinkedLeaves: Array<object>
  ): Promise<Tree> {

    //@ts-ignore


    await DBTree.create({
      _id, treeName, date, user, branches, unlinkedLeaves
    })

    return new Tree(_id, treeName, date, user, branches, unlinkedLeaves)
  }

  static async getAll(): Promise<Tree[]> {
    return await DBTree.find({})
  }


  static async update(
    treeId: string,
    treeName: string,
    description: string
  ): Promise<Tree> {

    const id = new mongodb.ObjectId(treeId)

    let tree = await DBTree.findOne({ _id: id })
    await DBTree.findOneAndUpdate({ _id: id }, { $set: { "treeName": treeName, "description": description } })
    return new Tree(id, treeName, tree?.date, tree?.user, tree?.branches, tree?.unlinkedLeaves, description)
  }

  static async getTreeById(treeId: string): Promise<Tree> {
    const id = new mongodb.ObjectId(treeId)


    let record = await DBTree.findOne({ _id: id })
    if (record === null) {
      throw new Error('There is no tree with this id')
    }
    const { _id, treeName, date, user, description, branches, unlinkedLeaves } = record
    //@ts-ignore
    return new Tree(_id, treeName, date, user, branches, unlinkedLeaves, description)
  }
}


export default Tree