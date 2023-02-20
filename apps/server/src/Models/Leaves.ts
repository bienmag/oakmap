import { DBTree } from "../lib/mongo";
const mongodb = require('mongodb');

class Leaf {
  constructor(
    public leafId: string,
    public treeId: string,
    public position: object,
    public type: string,
    public leafName?: string,
    public branchId?: string,
  ) { }

  static async create(
    leafId: string,
    treeId: string,
    position: object,
    type: string
  ): Promise<Leaf> {

    return new Leaf(leafId, treeId, position, type)
  }

  static async update(
    leafId: string,
    treeId: string,
    position: object,
    type: string,
    leafName?: string,
    branchId?: string
  ): Promise<Leaf> {


    const id = new mongodb.ObjectId(treeId)



    const foundinUnlinked = await DBTree.findOneAndUpdate(
      {
        _id: id, "unlinkedLeaves.leafId": leafId
      }, {
      $set: {
        "unlinkedLeaves.$.position": position,
        "unlinkedLeaves.$.leafName": leafName,
        "unlinkedLeaves.$.branchId": branchId
      }
    },
      { new: true }
    )

    let foundLeaf
    if (foundinUnlinked === null) {

      const tree = await DBTree.findOne({ id: id })
      if (tree === null) {
        throw new Error('The tree is not found')
      }

      for (const branch of tree.branches) {
        if (branch.leaves !== null) {
          for (const leaf of branch.leaves) {
            if (leaf.leafId === leafId) {
              foundLeaf = leaf

              const thing = await DBTree.findOneAndUpdate(
                { _id: id, "branches": { $elemMatch: { "branchId": foundLeaf.branchId, "leaves": { $elemMatch: { "leafId": leafId } } } } },
                { $set: { "branches.$[i].leaves.$[j].position": position, "branches.$[i].leaves.$[j].leafName": leafName, "branches.$[i].leaves.$[j].branchId": branchId } },
                { arrayFilters: [{ "i.branchId": foundLeaf.branchId }, { "j.leafId": leafId }], upsert: true }
              );
            }
          }
        }
      }
    }
    return new Leaf(leafId, treeId, position, type, leafName, branchId)
  }
  static async deleteLeaf(
    treeId: string,
    leafId: string
  ) {

    const id = new mongodb.ObjectId(treeId)

    let foundLeaf = await DBTree.find({ _id: id, "unlinkedLeaves": { $elemMatch: { "leafId": leafId } } })    // looking for the leaf in unlinked leaves
    let empty = Object.keys(foundLeaf).length === 0
    if (!empty) {
      let tree = await DBTree.findOne({ _id: id, "unlinkedLeaves": { $elemMatch: { "leafId": leafId } } })
      if (tree === null) {
        throw new Error('The branch is not found in this tree')
      }
      tree.unlinkedLeaves = tree?.unlinkedLeaves.filter(function (leaf) {
        return leaf.leafId !== leafId
      })
      await tree?.save()
      return
    } else {    // the leaf was not found in unlinkedLeaves -> means it's in a branch
      let foundLeaf
      let tree = await DBTree.findOne({ _id: id })
      if (tree === null) {
        throw new Error('The tree is not found')
      }
      for (const branch of tree.branches) {
        if (branch.leaves !== null) {
          for (const leaf of branch.leaves) {
            if (leaf.leafId === leafId) {
              foundLeaf = leaf    //leaf found
              await DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": foundLeaf.branchId } } }, { $pull: { "branches.$.leaves": foundLeaf } })

            }
          }
        }
      }
    }
  }
}


export default Leaf