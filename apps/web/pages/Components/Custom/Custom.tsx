import React, { useState, useEffect } from 'react'
function Custom({ selected, setNode }) {
  const [nodeName, setNodeName] = useState('')

  const handleDelNode = () => {
    setNode((nds) =>
      nds.filter((nd) =>
        nd.id !== 'dndnode_head' ? nd.id !== selected.id : nds
      )
    )
  }
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

  return (
    <div className="custom ">
      <div className="description">Custom Styles</div>
      <h3>Current Selected Node: {selected.id}</h3>
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
