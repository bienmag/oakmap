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

// import Sidebar from './Components/Sidebar/Sidebar'
import Custom from './Components/Custom/Custom'
import Markdown from './Components/Markdown/Markdown'
import Option from './Components/Option/Option'
import {
  nodeTypes,
  initialNodes,
  getId,
  CBackOnDragOver,
  CBackOnDrop,
  handleOnPaneClick,
  handleOnNodeClick,
  handleOnNodeDoubleClick,
} from '../Resources/Packages/RFlow/RFlow'
import { CREATOR } from '../Resources/Enums/Options'

export const InputContext = createContext(null)

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isDraggable, setIsDraggable] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selected, setSelected] = useState('')
  const [marked, setMarked] = useState('')
  const [option, setOption] = useState(CREATOR)

  const inputRef: any = useRef(null)

  useEffect(() => {
    setIsDraggable(option === CREATOR)
  }, [option])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event) => CBackOnDragOver(event), [])

  const onDrop = useCallback(
    (event) =>
      CBackOnDrop(event, reactFlowWrapper, reactFlowInstance, setNodes),
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
              onPaneClick={() => handleOnPaneClick(setSelected)}
              onNodeDoubleClick={(event, node) =>
                handleOnNodeDoubleClick(option, inputRef)
              }
              onNodeClick={(event, node) =>
                handleOnNodeClick(node, option, setMarked, setSelected)
              }
              fitView
            >
              {option === CREATOR ? (
                <Background />
              ) : (
                <Background variant="lines" />
              )}
              <Controls />
            </ReactFlow>
            <MiniMap />
          </div>
          <Option option={option} setOption={setOption} />
          {/* <Sidebar option={option} /> */}
          {option === CREATOR ? (
            <Custom
              selected={selected}
              setNodes={setNodes}
              setMarked={setMarked}
              option={option}
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
