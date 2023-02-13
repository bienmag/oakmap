import { DBMarkdown } from "../lib/mongo";
import { ObjectId } from "mongodb";
class Markdown {
    constructor(treeId, markdownText, branchId, leafId) {
        this.treeId = treeId;
        this.markdownText = markdownText;
        this.branchId = branchId;
        this.leafId = leafId;
    }
    static async create(treeId, markdownText, branchId, leafId) {
        const markdownId = new ObjectId();
        leafId === undefined ? (await DBMarkdown.create({
            markdownId, treeId, markdownText, branchId
        })) : (await DBMarkdown.create({
            markdownId, treeId, markdownText, leafId
        }));
    }
    static async getMarkdownByNodeId(nodeId) {
        //@ts-ignore
        let record = await DBMarkdown.findOne({ leafId: nodeId });
        if (record === null) {
            record = await DBMarkdown.findOne({ branchId: nodeId });
        }
        if (record === null) {
            throw new Error('There is no markdown in this node');
        }
        return new Markdown(undefined, record?.markdownText);
    }
}
export default Markdown;
