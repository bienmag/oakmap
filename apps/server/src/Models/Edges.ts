import { DBTree } from "../lib/mongo";
const mongodb = require('mongodb');


class Edge {
  constructor(
    public edgeId: string,
    public source: string,
    public sourceHandle: null,
    public target: string,
    public targetHandle: null,
    public type: string
  ) { }


  static async create(
    edgeId: string,
    source: string,
    sourceHandle: null,
    target: string,
    targetHandle: null,
    type: string
  ): Promise<Edge> {
    return new Edge(edgeId, source, sourceHandle, target, targetHandle, type)
  }

  static async getAll(treeId: string) {

    const id = new mongodb.ObjectId(treeId)
    const tree = await DBTree.findOne({ _id: id })

    if (tree === null) {
      throw new Error('The tree is not found')
    }
    return tree.edges
  }



  static async update(
    treeId: string,
    edgeId: string,
    source: string,
    sourceHandle: null,
    target: string,
    targetHandle: null,
    type: string
  ): Promise<Edge> {
    const id = new mongodb.ObjectId(treeId)


    await DBTree.findByIdAndUpdate({ _id: id, "edges.edgeId": edgeId },
      {
        $set: {
          "edges.$.source": source,
          "edges.$.target": target,
          "edges.$.type": type,
        }
      }, { new: true }
    )
    return new Edge(edgeId, source, sourceHandle, target, targetHandle, type)
  }

  static async delete(
    treeId: string,
    edgeId: string,
    source: string,
    sourceHandle: null,
    target: string,
    targetHandle: null,
    type: string
  ) {

    const id = new mongodb.ObjectId(treeId)

    let tree = await DBTree.findOne({ _id: id, "edges": { $elemMatch: { "edgeId": edgeId } } })
    if (tree === null) {
      throw new Error("The edge is not found in this tree")
    }
    tree.edges = tree.edges.filter(function (edge) {
      return edge.edgeId !== edgeId
    })
    await tree.save()
    return 'The edge was successfully deleted'
  }





}

export default Edge