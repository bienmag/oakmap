import { DBTree } from '../lib/mongo';
import mongodb from 'mongodb';
class Tree {
    constructor(_id, treeName, date, user, description, branches, unlinkedLeaves) {
        this._id = _id;
        this.treeName = treeName;
        this.date = date;
        this.user = user;
        this.description = description;
        this.branches = branches;
        this.unlinkedLeaves = unlinkedLeaves;
    }
    static async create(_id, date, treeName, user, description, branches, unlinkedLeaves) {
        //@ts-ignore
        await DBTree.create({
            _id,
            treeName,
            date,
            user,
            description,
            branches,
        });
        return new Tree(_id, treeName, date, user, description, branches, unlinkedLeaves);
    }
    static async getAll() {
        return await DBTree.find({});
    }
    static async getTreeById(treeId) {
        const id = new mongodb.ObjectId(treeId);
        console.log(id);
        let record = await DBTree.findOne({ _id: id });
        if (record === null) {
            throw new Error('There is no tree with this id');
        }
        const { _id, treeName, date, user, description, branches } = record;
        //@ts-ignore
        return new Tree(_id, treeName, date, user, description, branches);
    }
}
export default Tree;
