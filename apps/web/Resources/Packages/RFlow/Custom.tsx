import { DragEvent } from 'react'
import { Node } from 'reactflow'

export interface ITree {
  _id: string
  treeName: string
  user: string
  description: string
  branches: IBranch[]
  unlinkedLeaves: ILeaf[]
  edges: IEdge[]
  markdown?: string
}

export interface INodeInfo {
  text: string
  label: string
}

export interface IEdgeInfo {
  // Generic Edge data structure for nodes state
  id: string
  source: string
  target: string
}

export interface IEdge {
  // Generic info for Edge data for edges state
  id: string
  source: string
  sourceHandle: null
  target: string
  targetHandle: null
  type: string
}

export interface IEdgeServer {
  // Edge data from the server
  edgeId: string
  source: string
  sourceHandle: null
  target: string
  targetHandle: null
  type: string
}

export interface INode {
  // Generic Node data structure for nodes state
  id: string
  type: string
  position: { x: number; y: number }
  data: { label: string; text: string }
}

export interface IBranch {
  // Branch Data from server response
  branchId: string
  branchName: string
  leaves: []
  type: string
  position: { x: number; y: number }
  treeId: string
}

export interface ILeaf {
  // Branch Data from server response
  branchId: string
  leafId: string
  leafName: string
  type: string
  position: { x: number; y: number }
  treeId: string
}

export type NodeType = 'branch' | 'leftLeaf' | 'rightLeaf' | 'root'
export type TreeMode = 'reader' | 'editor'

export interface NodeOption {
  name: string
  type: NodeType
  className: string
}

export const allNodesOptions: NodeOption[] = [
  {
    name: 'Branch',
    type: 'branch',
    className: 'dndnode input',
  },
  { name: 'Left Leaf', type: 'leftLeaf', className: 'dndnode output' },
  { name: 'Right Leaf', type: 'rightLeaf', className: 'dndnode output' },
]

export const handleOnDragStart = (
  event: DragEvent,
  nodeType: NodeType,
  treeMode: TreeMode
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  if (treeMode === 'editor') event.dataTransfer.effectAllowed = 'move'
  else event.dataTransfer.effectAllowed = 'none'
}

type NodeReducer = (nodes: Node[]) => Node[]
type setterFunction = React.Dispatch<React.SetStateAction<Node<INodeInfo>[]>>
export const CBackHandleDelNode = (
  setNodes: setterFunction,
  selected: Node
) => {
  setNodes((nds) =>
    nds.filter((nd) => (nd.id !== 'node_head' ? nd.id !== selected.id : nds))
  )
}

export const handleSetNode = (
  setNodes: setterFunction,
  selected: Node<INodeInfo>,
  { text, label }: Partial<INodeInfo>
) =>
  setNodes((nds) =>
    nds.map((node) => {
      if (node.id === selected.id) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          text: text ? text : node.data.text,
          label: label ? label : node.data.label,
        }
      }
      return node
    })
  )
