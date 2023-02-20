import React, { useState, useEffect, useContext } from 'react'
// import { InputContext } from '../index';
import { InputContext } from '../Modes/TreeCanvas'
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
import { NODE_TYPE } from '../../Resources/Enums/Options'
import axios from 'axios'

/////////////////////////////////////////////////////
// CUSTOM MENU ON THE LEFT SIDE FOR DRAGGING NODES
////////////////////////////////////////////////////

interface ICustomProps {
  selected: Node<INodeInfo> | null
  setSelectedData: React.Dispatch<React.SetStateAction<string>>
  selectedData: string
  setNodes: React.Dispatch<React.SetStateAction<Node<INodeInfo>[]>>
  setMarked: React.Dispatch<React.SetStateAction<Node<INodeInfo> | null>>
  treeMode: TreeMode
  treeId: string
}

function Custom({
  selected,
  setSelectedData,
  selectedData,
  setNodes,
  setMarked,
  treeMode,
  treeId,
}: ICustomProps) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = async () => {
    console.log('selected to delete: ', selected)
    if (selected === null) return
    if (selected.type === NODE_TYPE.Branch) {
      const branchId = selected.id
      const response = await axios
        .delete(`http://localhost:8080/trees/${treeId}/branches/${branchId}`)
        .catch((error) => {
          console.log('Error deleting branch:', error)
        })
    }
    if (
      selected.type === NODE_TYPE.LeftLeaf ||
      selected.type === NODE_TYPE.RightLeaf
    ) {
      const leafIdNew = selected.id

      console.log('leafIdNew: ', leafIdNew)
      const response = await axios
        .delete(`http://localhost:8080/trees/${treeId}/leaves/${leafIdNew}`) // req.body though could include leafId: leafIdNew
        .catch((error) => {
          console.log('Error deleting leaf:', error)
        })
    }
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
              onChange={(e) => {
                setNodeName(e.target.value)
                setSelectedData(e.target.value) // for updating server
                // console.log('selectedData: ', selectedData)
              }}
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
