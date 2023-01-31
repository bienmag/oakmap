import React, { useState, useEffect } from 'react'
function Custom({ id, setNode }) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => {
    setNode((nds) => nds.filter((nd) => nd.id !== id))
  }
  useEffect(() => {
    setNode((nds) =>
      nds.map((node) => {
        if (node.id === id) {
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
  }, [id, nodeName, setNode])

  return (
    <div className="custom">
      <div className="description">Custom Styles</div>
      <h3>Current Selected Node: {id}</h3>
      <label htmlFor="name">Name</label>
      <input
        onChange={(e) => setNodeName(e.target.value)}
        value={nodeName}
        type="text"
        name="name"
      />
      <button onClick={handleDelNode}> Delete</button>
    </div>
  )
}

export default Custom
