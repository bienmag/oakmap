// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import mongodb from 'mongodb'
import { DBTree } from '../lib/mongo.js'
import { Branch, Leaf, Tree } from '../__generated__/resolvers-types'
export class LeafDataSource {
  async createLeaf(
    leafId: string,
    treeId: string,
    position: string,
    leafName?: string,
    branchId?: string
  ): Promise<Leaf> {
    return { leafId, treeId, leafName, branchId, position }
  }

  async updateLeaf(
    leafId: string,
    treeId: string,
    position: string,
    leafName?: string,
    branchId?: string
  ): Promise<Leaf> {
    let update: { position?: string; leafName?: string; branchId?: string } = {}

    if (position) update['position'] = position
    if (leafName) update['leafName'] = leafName
    if (branchId) update['branchId'] = branchId

    const id = new mongodb.ObjectId(treeId)

    const tree = await DBTree.findById({
      _id: id,
      branches: {
        $elemMatch: {
          branchId: branchId,
          leaves: { $elemMatch: { leafId: leafId } },
        },
      },
    })
    return { leafId, treeId, position, leafName, branchId }
  }

  async linkUnlink(treeId: string, branchId: string, leafId: string) {
    if (branchId === null) {
      // i have to unlink the leaf and push it to unlinkedLeaves
    } else {
      // link leaf to the branch
    }
  }

  async deleteLeaf(leafId: string) {
    let tree = await DBTree.findOne({ leafId: leafId })
    tree?.branches
  }
}
