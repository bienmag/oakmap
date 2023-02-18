import { Node, NodeTypes, ReactFlowInstance } from 'reactflow'
import {
  LeftLeafNode,
  RightLeafNode,
  BranchNode,
  RootNode,
} from '../../../Components/CustomNode/CustomNodes'
import { TreeMode } from './Custom'

export const nodeTypes: NodeTypes = {
  rightLeaf: RightLeafNode,
  leftLeaf: LeftLeafNode,
  branch: BranchNode,
  root: RootNode,
}

export const initialNodes = [
  {
    id: 'node_head',
    data: { label: 'Root', text: '' },
    position: { x: 0, y: 0 },
    type: 'root',
  },
]

let id = 0
export const getId = () => `node_${id++}`

export const CBackOnDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

// export const CBackOnDrop: React.DragEventHandler<HTMLDivElement> = (
//   event: React.DragEvent,
//   reactFlowWrapper: HTMLDivElement,
//   reactFlowInstance: ReactFlowInstance,
//   setNodes: React.Dispatch<React.SetStateAction<Node<INodeInfo>[]>>
// ) => {
//   event.preventDefault()

//   // const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
//   const reactFlowBounds = reactFlowWrapper.current ? reactFlowWrapper.current.getBoundingClientRect() : null;
//   const type = event.dataTransfer.getData('application/reactflow')

//   // check if the dropped element is valid
//   if (typeof type === 'undefined' || !type) {
//     return
//   }

//   const position = reactFlowInstance.project({
//     x: event.clientX - reactFlowBounds.left,
//     y: event.clientY - reactFlowBounds.top,
//   })
//   const newNode = {
//     id: getId(),
//     type,
//     position,
//     data: { label: ``, text: '' },
//   }

//   setNodes((nds) => nds.concat(newNode))
// }

export const handleOnPaneClick = (setSelected: React.Dispatch<React.SetStateAction<string>>) => {
  setSelected('')
}
export const handleOnNodeDoubleClick = (treeMode: TreeMode, inputRef: React.RefObject<HTMLInputElement>) => {
  if (treeMode === 'editor') {
    inputRef.current?.focus()
    inputRef.current?.select()
  } // setMarked(node)
}
// export const handleOnNodeClick = (node, treeMode, setMarked, setSelected) => {
//   if (treeMode === 'reader') setMarked(node)
//   setSelected(node)
// }
 
