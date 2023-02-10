import { DBTree } from "../lib/mongo";
const mongodb = require('mongodb');

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

    let update: { position?: object, leafName?: string, branchId?: string } = {}

    if (position) update['position'] = position;
    if (leafName) update['leafName'] = leafName;
    if (branchId) update['branchId'] = branchId

    const id = new mongodb.ObjectId(treeId)



    // let tree = await DBTree.findById({ _id: id, "unlinkedLeaves.leafId": leafId })
    // if (!tree) {
    //   throw new Error("There is no leaf with this leafId in the tree")



    // const tree = await DBTree.findById({ _id: id, branches: { $elemMatch: { branchId: branchId, leaves: { $elemMatch: { leafId: leafId } } } } })


    // WORKING TO UPDAATE THE LEaF IN UNLINKED LEAVES!!!!!!!!!!!! can try to use this  { $set: update },
    const tree = await DBTree.findOneAndUpdate(
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

    return new Leaf(leafId, treeId, position, leafName, branchId)
  }



  static async deleteLeaf(
    treeId: string,
    leafId: string
  ) {

    const id = new mongodb.ObjectId(treeId)
// find the leaf
// 1) unlinkedLeaves
// 2) treeId => branchhes (no branchId)
    let tree = await DBTree.findOne({ leafId: leafId })

    tree?.branches
  }
}



export default Leaf