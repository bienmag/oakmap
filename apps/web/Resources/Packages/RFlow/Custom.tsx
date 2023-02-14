import { DragEvent } from "react"
import { Node } from "reactflow"

export interface INodeInfo {
  text?: string,
  label?: string,
}

export type NodeType = "branch" | "leftLeaf" | "rightLeaf" | "root"
export type TreeMode = "reader" | "editor"

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

export const handleOnDragStart = (event: DragEvent, nodeType: NodeType, treeMode: TreeMode) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  if (treeMode === 'editor') event.dataTransfer.effectAllowed = 'move'
  else event.dataTransfer.effectAllowed = 'none'
}

type NodeReducer = (nodes: Node[]) => Node[]
type setterFunction = (handler: NodeReducer) => void
export const CBackHandleDelNode = (setNodes: setterFunction, selected: Node) => {
  setNodes((nds) =>
    nds.filter((nd) => (nd.id !== 'node_head' ? nd.id !== selected.id : nds))
  )
}


export const handleSetNode = (setNodes: setterFunction , selected: Node, { text, label }: INodeInfo) =>
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
