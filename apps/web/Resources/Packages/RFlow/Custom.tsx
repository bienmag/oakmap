export const allNodesOptions = [
  {
    name: 'Branch',
    type: 'branch',
    className: 'dndnode input',
  },
  { name: 'Left Leaf', type: 'leftLeaf', className: 'dndnode output' },
  { name: 'Right Leaf', type: 'rightLeaf', className: 'dndnode output' },
]

export const handleOnDragStart = (event, nodeType, treeMode) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  if (treeMode === 'editor') event.dataTransfer.effectAllowed = 'move'
  else event.dataTransfer.effectAllowed = 'none'
}

export const CBackHandleDelNode = (setNodes, selected) => {
  setNodes((nds) =>
    nds.filter((nd) => (nd.id !== 'node_head' ? nd.id !== selected.id : nds))
  )
}

export const handleSetNode = (setNodes, selected, { text, label }) =>
  setNodes((nds) =>
    nds.map((node) => {
      if (node.id === selected.id) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          text: text ? text : null,
          label: label ? label : null,
        }
      }

      return node
    })
  )
