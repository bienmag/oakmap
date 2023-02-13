import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { DBTree } from '../lib/mongo'
import mongodb from 'mongodb'

class Tree {
  constructor(
    public _id: object,
    public treeName: string,
    public date: object,
    public user: string,
    public description: string,
    public branches: Array<object>,
    public unlinkedLeaves: Array<object>
  ) {}

  static async create(
    _id: object,
    date: object,
    treeName: string,
    user: string,
    description: string,
    branches: Array<object>,
    unlinkedLeaves: Array<object>
  ): Promise<Tree> {
    //@ts-ignore

    await DBTree.create({
      _id,
      treeName,
      date,
      user,
      description,
      branches,
    })

    return new Tree(
      _id,
      treeName,
      date,
      user,
      description,
      branches,
      unlinkedLeaves
    )
  }

  static async getAll(): Promise<Tree[]> {
    return await DBTree.find({})
  }

  static async getTreeById(treeId: string): Promise<Tree> {
    const id = new mongodb.ObjectId(treeId)

    console.log(id)
    let record = await DBTree.findOne({ _id: id })
    if (record === null) {
      throw new Error('There is no tree with this id')
    }
    const { _id, treeName, date, user, description, branches } = record
    //@ts-ignore
    return new Tree(_id, treeName, date, user, description, branches)
  }
}

export default Tree
