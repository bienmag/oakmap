import mongodb from 'mongodb';
import { DBTree } from '../lib/mongo.js';
export class BranchDataSource {
    async createBranch(branchId, treeId, position, branchName, leaves) {
        return { branchId, treeId, position, branchName, leaves };
    }
    async updateBranch(branchId, treeId, position, branchName) {
        const id = new mongodb.ObjectId(treeId);
        const tree = await DBTree.findOneAndUpdate({
            _id: id,
            'branches.branchId': branchId,
        }, {
            $set: {
                'branches.$.position': position,
                'branches.$.branchName': branchName,
            },
        }, { new: true });
        return { branchId, treeId, position, branchName };
    }
    async linkUnlink(treeId, branchId, leafId) {
        const id = new mongodb.ObjectId(treeId);
        if (branchId === '') {
            // if branch is not provided I have to unlink. the leaf could be in unlinkedLeaves or inside some branch
            let tree = await DBTree.findOne({ _id: id });
            if (!tree) {
                throw new Error('There is no tree with this tree id');
            }
            //looking for the leaf
            let foundLeaf;
            for (const branch of tree.branches) {
                if (branch.leaves !== null) {
                    for (const leaf of branch.leaves) {
                        if (leaf.leafId === leafId) {
                            foundLeaf = leaf;
                            //leaf found
                            // push it to unlinkedLeaves
                            await DBTree.findOneAndUpdate({ _id: id }, { $push: { unlinkedLeaves: leaf } });
                            //check if the leaf has branch id. if so, delete the leaf from that branch
                            let branchId = leaf.branchId;
                            if (branchId !== null) {
                                await DBTree.findOneAndUpdate({
                                    _id: id,
                                    branches: {
                                        $elemMatch: {
                                            branchId: branchId,
                                            leaves: { $elemMatch: { leafId: leafId } },
                                        },
                                    },
                                }, { $pull: { 'branches.$.leaves': leaf } });
                                break;
                            }
                        }
                    }
                }
                else {
                    throw new Error('Branch.leaves is null');
                }
                if (foundLeaf) {
                    break;
                }
            }
            if (!foundLeaf) {
                throw new Error('No leaf was found in this tree with the leafId');
            }
        }
        else {
            //find the leaf in the unlinkedLeaves && delete it from there && put it in the variable OR it can be linked to another branch already
            const leaf = await DBTree.findOne({
                _id: id,
                unlinkedLeaves: { $elemMatch: { leafId: leafId } },
            });
            console.log(leaf);
            if (leaf !== null) {
                //that means that the leaf was found in unlinked
                //delete from unlinked
                await DBTree.findOneAndUpdate({ _id: id, unlinkedLeaves: { $elemMatch: { leafId: leafId } } }, { $pull: { unlinkedLeaves: { leafId: leafId } } });
                //and push to the branch with branchId
                // await DBTree.findOneAndUpdate({_id:id, "branches": {$elemMatch: {"branchId": branchId}} }, {$push : {"branches.$.leaves" : {""}}})
            }
            else {
                //means that the leaf is already inside some branch and I should also delete it from there abd push to the new branch
                let tree = await DBTree.findOne({ _id: id });
                if (!tree) {
                    throw new Error('There is no tree with this tree id');
                }
                let foundLeaf;
                for (const branch of tree.branches) {
                    if (branch.leaves !== null) {
                        for (const leaf of branch.leaves) {
                            if (leaf.leafId === leafId) {
                                foundLeaf = leaf;
                                let oldBranch = leaf.branchId;
                                if (oldBranch !== null) {
                                    await DBTree.findOneAndUpdate({
                                        _id: id,
                                        branches: {
                                            $elemMatch: {
                                                branchId: oldBranch,
                                                leaves: { $elemMatch: { leafId: leafId } },
                                            },
                                        },
                                    }, { $pull: { 'branches.$.leaves': leaf } });
                                    await DBTree.findOneAndUpdate({
                                        _id: id,
                                        branches: { $elemMatch: { branchId: branchId } },
                                    }, { $push: { 'branches.$.leaves': leaf } });
                                    break;
                                }
                                break;
                            }
                        }
                    }
                    else {
                        throw new Error('Branch.leaves is null');
                    }
                    if (foundLeaf) {
                        break;
                    }
                }
                if (!foundLeaf) {
                    throw new Error('No leaf was found in this tree with the leafId');
                }
            }
            // push the found leaf to the tree => branches.branchId
            // let tree = await DBTree.findOne({ _id: id, branchId: branchId }, { $push: { leaves: leaf } })
            // console.log("tree", tree)
        }
        return true;
    }
    async deleteBranch(branchId) {
        let tree = await DBTree.findOne({ branchId: branchId });
        //@ts-ignore
        tree.branches = tree?.branches.filter(function (branch) {
            return branch.branchId !== branchId;
        });
        await tree?.save();
        return;
    }
}
