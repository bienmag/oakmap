// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import mongodb from 'mongodb'
import { DBTree } from '../lib/mongo.js'
import { Branch, Leaf, Tree } from '../__generated__/resolvers-types'
export class TreeDataSource {
  async getAll(): Promise<Tree[]> {
    return [
      {
        _id: '1',
        treeName: 'test',
        description: 'first',
      },
      { _id: '2', treeName: 'test', description: 'next' },
    ]

    return await DBTree.find({})
  }

  async createTree(
    _id: string,
    date: string,
    treeName: string,
    user: string,
    description: string,
    branches: Branch[],
    unlinkedLeaves: Leaf[]
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
    return {
      _id,
      treeName,
      date,
      user,
      description,
      branches,
      unlinkedLeaves,
    }
  }

  async getTreeById(treeId: string): Promise<Tree> {
    const id = new mongodb.ObjectId(treeId)

    console.log(id)
    let record = await DBTree.findOne({ _id: id })
    if (record === null) {
      throw new Error('There is no tree with this id')
    }
    const { _id, treeName, date, user, description, branches } = record
    //@ts-ignore
    return {
      _id,
      treeName,
      date,
      user,
      description,
      branches,
    }
  }
}
