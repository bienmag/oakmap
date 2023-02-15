import React, { useState, useEffect, useContext } from 'react'
// import { InputContext } from '../index';
import { InputContext } from '../Modes/TreeEditorMode'
import {
  allNodesOptions,
  CBackHandleDelNode,
  handleOnDragStart,
  handleSetNode,
  INodeInfo,
  NodeType,
  TreeMode,
} from '../../Resources/Packages/RFlow/Custom'
import { v4 as uuidv4 } from 'uuid'
import { Node } from 'reactflow'

/////////////////////////////////////////////////////
// CUSTOM MENU ON THE LEFT SIDE FOR DRAGGING NODES
////////////////////////////////////////////////////

interface ICustomProps {
  selected: Node<INodeInfo> | null
  setNodes: React.Dispatch<React.SetStateAction<Node<INodeInfo>[]>>
  setMarked: React.Dispatch<React.SetStateAction<Node<INodeInfo> | null>>
  treeMode: TreeMode
}

function Custom({ selected, setNodes, setMarked, treeMode }: ICustomProps) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => {
    if (selected === null) return
    CBackHandleDelNode(setNodes, selected)
  }

  const handleMarkdown = () => {
    setMarked(selected)
  }

  useEffect(() => {
    if (selected) setNodeName(selected.data.label)
    else setNodeName('')
  }, [selected])

  useEffect(() => {
    if (selected === null) return
    handleSetNode(setNodes, selected, { label: nodeName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeName, setNodes])

  const inputRef = useContext(InputContext)

  //from Sidebar.tsx

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) =>
    handleOnDragStart(event, nodeType, treeMode)

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {allNodesOptions.map((option) => {
        return (
          <div
            key={uuidv4()}
            className={option.className}
            onDragStart={(event) => onDragStart(event, option.type)}
            draggable
          >
            {option.name}
          </div>
        )
      })}
      {/* <div className="custom"> */}
      <div className="description">
        <h3> Selected Node: {selected === null ? 'None' : selected.id}</h3>
        {selected !== null && (
          <div className="custom-name-input">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setNodeName(e.target.value)}
              value={nodeName}
              className="pl-2"
              type="text"
              name="name"
              disabled={false}
              ref={inputRef}
            />
            {/* className="opacity-0" */}
            <div className="custom-menu-buttons">
              {selected.id !== 'node_head' && (
                <>
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={handleMarkdown}
                  >
                    Markdown
                  </button>
                  <button
                    className="custom-button hover:bg-red-400"
                    onClick={handleDelNode}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Custom
