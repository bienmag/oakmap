import React, { useState, useEffect } from 'react'
// import { InputContext } from '../index';
import { InputContext } from '../../index';


function Custom({ selected, setNode, marked, setMarked }) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => {
    setNode((nds) =>
      nds.filter((nd) =>
        nd.id !== 'dndnode_head' ? nd.id !== selected.id : nds
      )
    )
  }

  /*   const handleMarkdown = () => {
      setMarked(node)
    } */

  useEffect(() => {
    if (selected) setNodeName(selected?.data?.label)
    else setNodeName('')
  }, [selected])

  useEffect(() => {
    setNode((nds) =>
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
  }, [selected.id, nodeName, setNode])

  const inputRef = React.useContext(InputContext);

  return (
    <div className="custom">
      <div className="description">Custom Styles</div>
      <h3> Selected Node: {selected === '' ? 'None' : selected.id}</h3>
      {selected === '' ? null : (
        <div>
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
          <button onClick={handleDelNode}> Delete</button>
        </div>
      )}
    </div>
  )
}

export default Custom
