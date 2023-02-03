import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
} from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
} from 'reactflow'
import 'reactflow/dist/style.css'

import Sidebar from './Components/Sidebar/Sidebar'
import Custom from './Components/Custom/Custom'
import Markdown from './Components/Markdown/Markdown'
import Option from './Components/Option/Option'
import {
  LeafNode,
  BranchNode,
  RootNode,
} from './Components/CustomNode/CustomNodes'



const nodeTypes = {
  leaf: LeafNode,
  branch: BranchNode,
  root: RootNode,
}

const initialNodes = [
  {
    id: 'dndnode_head',
    data: { label: 'Root' },
    position: { x: 0, y: 0 },
    type: 'root',
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

export const InputContext = createContext(null)

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isDraggable, setIsDraggable] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selected, setSelected] = useState('')
  const [marked, setMarked] = useState('')
  const [option, setOption] = useState('creator')

  const inputRef: any = useRef(null)

  useEffect(() => {
    setIsDraggable(option === 'creator')
  }, [option])

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
      <InputContext.Provider value={inputRef}>
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper absolute inset-0"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodesDraggable={isDraggable}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              deleteKeyCode={null}
              onDragOver={onDragOver}
              onPaneClick={() => {
                setSelected('')
              }}
              onNodeDoubleClick={(event, node) => {
                if (option === 'creator') {
                  inputRef.current.focus()
                  inputRef.current.select()
                  console.log('node: ', node)
                } // setMarked(node)
              }}
              onNodeClick={(event, node) => {
                if (option === 'reader') setMarked(node)
                setSelected(node)
              }}
              fitView
            >

              {option === 'creator' ? (
                <Background />) : (<Background variant='lines' />)
              }
              <Controls />
            </ReactFlow>
            <MiniMap />
          </div>
          <Option option={option} setOption={setOption} />
          <Sidebar option={option} />
          {option === 'creator' ? (
            <Custom
              selected={selected}
              setNodes={setNodes}
              setMarked={setMarked}
            />
          ) : (
            <div></div>
          )}
          <Markdown
            marked={marked}
            setMarked={setMarked}
            setNodes={setNodes}
            selected={selected}
            option={option}
          />
        </ReactFlowProvider>
      </InputContext.Provider>
    </div>
  )
}

export default DnDFlow
