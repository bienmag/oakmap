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
import Button from '../Wrapper/Button'

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
    if (selected === null) return
    if (selected.type === NODE_TYPE.Branch) {
      const branchId = selected.id
      const response = await axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/branches/${branchId}`)
        .catch((error) => {
          console.log('Error deleting branch:', error)
        })
    }
    if (
      selected.type === NODE_TYPE.LeftLeaf ||
      selected.type === NODE_TYPE.RightLeaf
    ) {
      const leafIdNew = selected.id
      const response = await axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/leaves/${leafIdNew}`) // req.body though could include leafId: leafIdNew
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
      <div className="bg-ylw-palette">
        <div className="description ">
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
                className="pl-2 m-0 "
                type="text"
                name="name"
                disabled={false}
                ref={inputRef}
              />
              {/* className="opacity-0" */}
              <div className="custom-menu-buttons">
                {selected.id !== 'node_head' && (
                  <>
                    <Button
                      className="custom-button hover:bg-sky-600 "
                      onClick={handleMarkdown}
                    >
                      Markdown
                    </Button>
                    <Button
                      className="custom-button hover:bg-red-600"
                      onClick={handleDelNode}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Custom
