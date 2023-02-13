import mongodb from 'mongodb';
import { DBTree } from '../lib/mongo.js';
export class TreeDataSource {
    async getAll() {
        return [
            {
                _id: '1',
                treeName: 'test',
                description: 'first',
            },
            { _id: '2', treeName: 'test', description: 'next' },
        ];
        return await DBTree.find({});
    }
    async createTree(_id, date, treeName, user, description, branches, unlinkedLeaves) {
        //@ts-ignore
        await DBTree.create({
            _id,
            treeName,
            date,
            user,
            description,
            branches,
        });
        return {
            _id,
            treeName,
            date,
            user,
            description,
            branches,
            unlinkedLeaves,
        };
    }
    async getTreeById(treeId) {
        const id = new mongodb.ObjectId(treeId);
        console.log(id);
        let record = await DBTree.findOne({ _id: id });
        if (record === null) {
            throw new Error('There is no tree with this id');
        }
        const { _id, treeName, date, user, description, branches } = record;
        //@ts-ignore
        return {
            _id,
            treeName,
            date,
            user,
            description,
            branches,
        };
    }
}
