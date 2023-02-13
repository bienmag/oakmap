// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { ObjectId } from 'mongodb';
import { DBMarkdown } from '../lib/mongo.js';
export class MarkDownDataSource {
    async createMarkDown(treeId, markdownText, branchId, leafId) {
        const markdownId = new ObjectId();
        leafId === undefined
            ? await DBMarkdown.create({
                markdownId,
                treeId,
                markdownText,
                branchId,
            })
            : await DBMarkdown.create({
                markdownId,
                treeId,
                markdownText,
                leafId,
            });
        return {
            treeId,
            markdownText,
            branchId,
            leafId,
        };
    }
    async getMarkdownByNodeId(nodeId) {
        //@ts-ignore
        let record = await DBMarkdown.findOne({ leafId: nodeId });
        if (record === null) {
            record = await DBMarkdown.findOne({ branchId: nodeId });
        }
        if (record === null) {
            throw new Error('There is no markdown in this node');
        }
        return record;
    }
}
