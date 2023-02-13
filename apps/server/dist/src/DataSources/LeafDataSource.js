import mongodb from 'mongodb';
import { DBTree } from '../lib/mongo.js';
export class LeafDataSource {
    async createLeaf(leafId, treeId, position, leafName, branchId) {
        return { leafId, treeId, leafName, branchId, position };
    }
    async updateLeaf(leafId, treeId, position, leafName, branchId) {
        let update = {};
        if (position)
            update['position'] = position;
        if (leafName)
            update['leafName'] = leafName;
        if (branchId)
            update['branchId'] = branchId;
        const id = new mongodb.ObjectId(treeId);
        const tree = await DBTree.findById({
            _id: id,
            branches: {
                $elemMatch: {
                    branchId: branchId,
                    leaves: { $elemMatch: { leafId: leafId } },
                },
            },
        });
        return { leafId, treeId, position, leafName, branchId };
    }
    async linkUnlink(treeId, branchId, leafId) {
        if (branchId === null) {
            // i have to unlink the leaf and push it to unlinkedLeaves
        }
        else {
            // link leaf to the branch
        }
    }
    async deleteLeaf(leafId) {
        let tree = await DBTree.findOne({ leafId: leafId });
        tree?.branches;
    }
}
