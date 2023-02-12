import React, { useState, useEffect, useContext } from 'react'
// import { InputContext } from '../index';
import { InputContext } from '../Modes/TreeEditorMode'
import {
  allNodesOptions,
  CBackHandleDelNode,
  handleOnDragStart,
  handleSetNode,
} from '../../../Resources/Packages/RFlow/Custom'
import { v4 as uuidv4 } from 'uuid'

/////////////////////////////////////////////////////
// CUSTOM MENU ON THE LEFT SIDE FOR DRAGGING NODES
////////////////////////////////////////////////////

function Custom({ selected, setNodes, setMarked, treeMode }: any) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => CBackHandleDelNode(setNodes, selected)

  const handleMarkdown = () => {
    setMarked(selected)
  }

  useEffect(() => {
    if (selected) setNodeName(selected.data.label)
    else setNodeName('')
  }, [selected])

  useEffect(() => {
    handleSetNode(setNodes, selected, { label: nodeName })
  }, [nodeName, setNodes])

  const inputRef = useContext(InputContext)

  //from Sidebar.tsx

  const onDragStart = (event, nodeType) =>
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
        <h3> Selected Node: {selected === '' ? 'None' : selected.id}</h3>
        {selected !== '' && (
          <div className="custom-name-input">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setNodeName(e.target.value)}
              value={nodeName}
              className="pl-2"
              type="text"
              name="name"
              disabled={selected === '' ? true : false}
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
