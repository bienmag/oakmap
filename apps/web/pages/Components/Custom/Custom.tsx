import React, { useState, useEffect } from 'react'
// import { InputContext } from '../index';
import { InputContext } from '../Modes/TreeEditorMode'

function Custom({ selected, setNodes, setMarked, treeMode }: any) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => {
    setNodes((nds) =>
      nds.filter((nd) =>
        nd.id !== 'node_head' ? nd.id !== selected.id : nds
      )
    )
  }

  const handleMarkdown = () => {
    setMarked(selected)
  }

  useEffect(() => {
    if (selected) setNodeName(selected?.data?.label)
    else setNodeName('')
  }, [selected])

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selected.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          }
        }

        return node
      })
    )
  }, [selected.id, nodeName, setNodes])

  const inputRef = React.useContext(InputContext)


  //from Sidebar.tsx 

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    if (treeMode === 'creator') event.dataTransfer.effectAllowed = 'move'
    else event.dataTransfer.effectAllowed = 'none'
  }

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'branch')}
        draggable
      >
        Branch
      </div>

      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'leftLeaf')}
        draggable
      >
        Left Leaf
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'rightLeaf')}
        draggable
      >
        Right Leaf
      </div>
      {/* <div className="custom"> */}
      <div className="description">
        <div className="description"></div>
        <h3> Selected Node: {selected === '' ? 'None' : selected.id}</h3>
        {selected === '' ? null : (
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
              {selected.id === 'node_head' ? (<></>) : (<button
                className="custom-button hover:bg-blue-400"
                onClick={handleMarkdown}
              >
                {' '}
                Markdown
              </button>)}
              {selected.id === 'node_head' ? (
                <></>) : (<button
                  className="custom-button hover:bg-red-400"

                  onClick={handleDelNode}
                >
                  {' '}
                  Delete
                </button>)}

            </div>
          </div>
        )}
      </div>
    </aside >
  )
}

export default Custom
