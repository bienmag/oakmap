import {
  leftLeafNode,
  rightLeafNode,
  BranchNode,
  RootNode,
} from '../../../pages/Components/CustomNode/CustomNodes'


export const nodeTypes = {
  rightLeaf: rightLeafNode,
  leftLeaf: leftLeafNode,
  branch: BranchNode,
  root: RootNode,
}

export const initialNodes = [
  {
    id: 'node_head',
    data: { label: 'Root' },
    position: { x: 0, y: 0 },
    type: 'root',
  },
]

let id = 0
export const getId = () => `node_${id++}`

export const CBackOnDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

export const CBackOnDrop = (
  event,
  reactFlowWrapper,
  reactFlowInstance,
  setNodes
) => {
  event.preventDefault()

  // const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
  const reactFlowBounds = reactFlowWrapper.current ? reactFlowWrapper.current.getBoundingClientRect() : null;
  const type = event.dataTransfer.getData('application/reactflow')

  // check if the dropped element is valid
  if (typeof type === 'undefined' || !type) {
    return
  }

  const position = reactFlowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  })
  const newNode = {
    id: getId(),
    type,
    position,
    data: { label: ``, text: '' },
  }

  setNodes((nds) => nds.concat(newNode))
}

export const handleOnPaneClick = (setSelected) => {
  setSelected('')
}
export const handleOnNodeDoubleClick = (treeMode, inputRef) => {
  if (treeMode === 'editor') {
    inputRef.current.focus()
    inputRef.current.select()
  } // setMarked(node)
}
export const handleOnNodeClick = (node, treeMode, setMarked, setSelected) => {
  if (treeMode === 'reader') setMarked(node)
  setSelected(node)
}