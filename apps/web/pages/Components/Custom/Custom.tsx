import React, { useState, useEffect } from 'react'
// import { InputContext } from '../index';
import { InputContext } from '../../index'

function Custom({ selected, setNodes, setMarked }: any) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => {
    setNodes((nds) =>
      nds.filter((nd) =>
        nd.id !== 'dndnode_head' ? nd.id !== selected.id : nds
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

  return (
    <div className="custom">
      <div className="description">Custom Styles</div>
      <h3>Current Selected Node: {selected === '' ? 'None' : selected.id}</h3>
      {selected === '' ? null : (
        <div className="custom-name-input">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setNodeName(e.target.value)}
            value={nodeName}
            type="text"
            name="name"
            disabled={selected === '' ? true : false}
            ref={inputRef}
          />
          {/* className="opacity-0" */}
          <div className="custom-menu-buttons">
            <button
              className="custom-button hover:bg-red-400"
              onClick={handleDelNode}
            >
              {' '}
              Delete
            </button>
            <button
              className="custom-button hover:bg-blue-400"
              onClick={handleMarkdown}
            >
              {' '}
              Markdown
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Custom
