import React, { useState, useRef, useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from 'reactflow'
import 'reactflow/dist/style.css'

import Sidebar from './Component/Sidebar'
import Custom from './Component/Custom'
import Markdown from './Component/Markdown'

import './index.css'

const initialNodes = [
  {
    id: 'dndnode_head',
    data: { label: 'Root' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selected, setSelected] = useState('')
  const [marked, setMarked] = useState('')
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: ``, text: '' },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  return (
    <div className="dndflow" style={{ height: '100vh' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={(event, node) => {
              if (selected && selected.id === node.id) setMarked(node)
              else setMarked('')
              setSelected(node)
            }}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
        <Custom selected={selected} setNode={setNodes} />
        <Markdown
          marked={marked}
          setMarked={setMarked}
          setNode={setNodes}
          selected={selected}
        />
      </ReactFlowProvider>
    </div>
  )
}

export default DnDFlow
