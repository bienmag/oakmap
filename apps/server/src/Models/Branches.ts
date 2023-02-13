import { DBTree } from "../lib/mongo";
const mongodb = require('mongodb');


class Branch {
  constructor(
    public branchId: string,
    public treeId: string,
    public position: object,
    public branchName?: string,
    public leaves?: Array<object>,
  ) { }

  static async create(
    branchId: string,
    treeId: string,
    position: object,
    leaves: Array<object>
  ): Promise<Branch> {


    return new Branch(branchId, treeId, position, undefined, leaves)
  }

  static async update(
    branchId: string,
    treeId: string,
    position: object,
    branchName: string
  ): Promise<Branch> {

    const id = new mongodb.ObjectId(treeId)


    const tree = await DBTree.findOneAndUpdate({
      _id: id, "branches.branchId": branchId
    },

      {
        $set: {
          "branches.$.position": position,
          "branches.$.branchName": branchName
        }
      }, { new: true })


    return new Branch(branchId, treeId, position, branchName)
  }


  static async linkUnlink(
    treeId: string,
    branchId: string,
    leafId: string) {

    const id = new mongodb.ObjectId(treeId)

    if (branchId === "") {
      // if branchId  is not provided -> look for the leaf inside tree.branches.leaves -> delete it from there -> push it to unlinkedLeaves
      let tree = await DBTree.findOne({ _id: id })


      if (!tree) {
        throw new Error('There is no tree with this tree id')
      }

      //looking for the leaf inside tree.branches
      let foundLeaf
      for (const branch of tree.branches) {
        if (branch.leaves !== null) {
          for (const leaf of branch.leaves) {
            if (leaf.leafId === leafId) {
              //the leaf is found!
              foundLeaf = leaf
              // deleting the leaf from the branch where it's found and setting leaf.branchId to ""
              let branchId = foundLeaf.branchId
              await DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": branchId, "leaves": { $elemMatch: { "leafId": leafId } } } } }, { $pull: { "branches.$.leaves": leaf } })
              foundLeaf.branchId = ""

              // pushing the leaf to unlinkedLeaves
              await DBTree.findOneAndUpdate({ _id: id }, { $push: { unlinkedLeaves: leaf } })


              // the leaf with the leafId is not found in the branches.leaves  
              if (branchId !== null) {
                break
              }
            }
          }
        } else {
          throw new Error('Branch.leaves is null')
        }
        if (foundLeaf) {
          break
        }
      }

      if (!foundLeaf) {
        throw new Error('No leaf was found in this tree with the leafId')
      }


      // this is if both branchId and leafId received in the request
    } else {
      // the leaf can be: 1) inside some branches.leaves 2) inside unlinkedLeaves
      let tree = await DBTree.findOne({ _id: id })
      if (!tree) {
        throw new Error('There is no tree with this tree id')
      }


      // looking for the leaf
      let foundLeaf
      // looking for the leaf inside unlinkedLeaves
      for (const leaf of tree.unlinkedLeaves) {
        if (leaf.leafId === leafId) {
          // the leaf found in the unlinkedLeaves
          foundLeaf = leaf
          //delete if from there
          await DBTree.findOneAndUpdate({ _id: id, "unlinkedLeaves": { $elemMatch: { "leafId": leafId } } }, { $pull: { "unlinkedLeaves": leaf } })
          //push to the branch with branchId
          foundLeaf.branchId = branchId
          await DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": branchId } } }, { $push: { "branches.$.leaves": leaf } })
        } else {
          console.error('The leaf was not found in the unlinkedLeaves')
        }
        // means that the leaf is already inside some branch
        for (const branch of tree.branches) {
          console.log('am i entering here')
          if (branch.leaves !== null) {
            for (const leaf of branch.leaves) {
              if (leaf.leafId === leafId) {
                //leaf found
                foundLeaf = leaf
                console.log('foundleaf', foundLeaf)
                //delete it from that branch
                let prevBranchId = foundLeaf.branchId
                console.log("prevBranchId", prevBranchId)
                if (branchId !== null) {
                  await DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": prevBranchId, "leaves": { $elemMatch: { "leafId": leafId } } } } }, { $pull: { "branches.$.leaves": leaf } })
                  //push to the new branch and change its branchId
                  foundLeaf.branchId = branchId
                  await DBTree.findOneAndUpdate({ _id: id, "branches": { $elemMatch: { "branchId": branchId } } }, { $push: { "branches.$.leaves": leaf } })
                  break
                }
              }
            }
          } else {
            throw new Error('Branch.leaves is null')
          }
          if (foundLeaf) {
            break
          }
        }

        if (!foundLeaf) {
          throw new Error('No leaf was found in this tree with the leafId')
        }

      }

    }
    return
  }

  // note to commit

  static async deleteBranch(
    branchId: string
  ) {
    let tree = await DBTree.findOne({ branchId: branchId })
    //@ts-ignore
    tree.branches = tree?.branches.filter(function (branch) {
      return branch.branchId !== branchId
    })
    await tree?.save()
    return
  }


}



export default Branch