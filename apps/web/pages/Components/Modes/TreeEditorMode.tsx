import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    createContext,
    Fragment,
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

import Custom from '../Custom/Custom'
import Markdown from '../Markdown/Markdown'
import DescriptionMenu from '../DescriptionMenu/DescriptionMenu'
import Option from '../Option/Option'
import {
  leftLeafNode,
  rightLeafNode,
  BranchNode,
  RootNode,
} from '../CustomNode/CustomNodes'
  

const nodeTypes = {
    rightLeaf: rightLeafNode,
    leftLeaf: leftLeafNode,
    branch: BranchNode,
    root: RootNode,
  }
  
  const initialNodes = [
    {
      id: 'node_head',
      data: { label: 'Root' },
      position: { x: 0, y: 0 },
      type: 'root',
    },
  ]
  

let id = 0
const getId = () => `node_${id++}`

export const InputContext = createContext(null)


export function TreeEditorMode() {

    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [isDraggable, setIsDraggable] = useState(false)
    const [reactFlowInstance, setReactFlowInstance] = useState(null)
    const [selected, setSelected] = useState('')
    const [marked, setMarked] = useState('')
    const [option, setOption] = useState('creator')
  
    // Draggable State
    const [isOpen, setIsOpen] = useState(false)
  
    const openBottomSheet = () => setIsOpen(true)
    const closeBottomSheet = () => setIsOpen(false)
  
    // useRef for double click on node to focus on input text
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
  
    // Description Menu markdown
    const [description, setDescription] = useState('')
  
    useEffect(() => {
      setDescription(marked?.data?.text)
    }, [marked])
  




  return (
            <div className="dndflow" style={{ height: '100vh' }}>
                        <InputContext.Provider value={inputRef}>
                        <div className="React-Flow-Container">
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
                        <Option option={option} setOption={setOption} openBottomSheet={openBottomSheet} />
                        {/* <Sidebar option={option} /> */}
                        {option === 'creator' ? (
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
                            </div>
            </InputContext.Provider>
            <div>
                <DescriptionMenu
                isOpen={isOpen}
                closeBottomSheet={closeBottomSheet}
                setDescription={setDescription}
                description={description}
                option={option}
                />
            </div >
            </div >
)
}
