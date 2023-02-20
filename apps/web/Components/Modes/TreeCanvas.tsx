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
  OnConnect,
  ReactFlowInstance,
  Node,
  XYPosition,
  BackgroundVariant,
  updateEdge,
  SmoothStepEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'

import Custom from '../Custom/Custom'
import Markdown from '../Markdown/Markdown'

// TESTING IMPORT FROM RESOURCES
import { initialNodes, nodeTypes } from '../../Resources/Packages/RFlow/RFlow'

import { useRouter } from 'next/router'
import {
  IEdgeInfo,
  INodeInfo,
  INode,
  TreeMode,
  IBranch,
  ILeaf,
  ITree,
  IEdge,
  IEdgeServer,
} from '../../Resources/Packages/RFlow/Custom'

// CONTEXT FOR REACT FLOW NODES
import { NodesContext } from '../../Resources/Packages/RFlow/NodesContext'
import { useContext } from 'react'
import axios from 'axios'
import { NODE_TYPE, TREE_MODE } from '../../Resources/Enums/Options'
import { setegid } from 'process'
import { Console } from 'console'
import { useTreeContext } from '../../Resources/Packages/RFlow/TreeContext'
// import { TreeMode } from '../../Resources/Enums/Options'

import { v4 as uuidv4 } from 'uuid'
import Field from '../Field/Field'

const getId = () => uuidv4()

export const InputContext =
  createContext<React.RefObject<HTMLInputElement> | null>(null)

interface TreeCanvasProps {
  tree: ITree
}
export function TreeCanvas({ tree }: TreeCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  // NOTE: We moved nodes and edges state to the NodesContext file
  // NOTE: TreeContext is used for passing the initialNodes and initialEdges data to NodesContext

  const [isDraggable, setIsDraggable] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)
  const [selected, setSelected] = useState<Node<INodeInfo> | null>(null)
  const [marked, setMarked] = useState<Node<INodeInfo> | null>(null)

  // useRef for double click on node to focus on input text
  const inputRef = useRef<HTMLInputElement>(null)

  const [treeMode, setTreeMode] = useState(TREE_MODE.Editor)

  // Nodes and Edges State
  const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange } =
    useContext(NodesContext)

  console.log('nodes: ', nodes)
  console.log('edges: ', edges)

  useEffect(() => {
    setIsDraggable(treeMode === TREE_MODE.Editor)
  }, [treeMode])

  // TREE ID

  const treeId = tree._id
  console.log('TREE ID: ', treeId)

  // CREATING EDGES

  const onConnect: OnConnect = useCallback(async (params) => {
    console.log('Edge onConnect params: ', params)

    const response = await axios
      .post(`http://localhost:8080/trees/${treeId}/edges`, {
        edgeId: `edge_${getId()}`,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: params.target,
        targetHandle: params.targetHandle,
        type: 'default',
      })
      .then((response) => {
        const newEdge: IEdge = {
          // maybe needs to be IEdgeInfo ?
          id: response.data.edgeId,
          source: response.data.source,
          sourceHandle: response.data.sourceHandle,
          target: response.data.target,
          targetHandle: response.data.targetHandle,
          type: response.data.type,
        }

        console.log('newEdge response: ', newEdge)
        setEdges((eds: IEdgeInfo[]) => addEdge(newEdge, eds))
      })
    // setEdges((eds: IEdgeInfo[]) => addEdge(params, eds))
  }, [])

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },
    []
  )

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    async (event) => {
      event.preventDefault()
      if (reactFlowWrapper.current === null) return
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      if (reactFlowInstance === null) return
      const position: XYPosition = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode: INode = {
        id: `node_${getId()}`,
        type,
        position,
        data: { label: ``, text: '' },
      }

      // POST REQUEST FOR CREATING A NEW NODE

      if (type === NODE_TYPE.Branch) {
        const response = await axios
          .post(`http://localhost:8080/trees/${treeId}/branches`, {
            branchId: newNode.id,
            treeId: tree._id,
            position: newNode.position,
            type: newNode.type,
            branchName: newNode.data.label,
          })
          .then((response) => {
            // A single branch will be returned in the response

            const newBranch = {
              id: response.data.branchId,
              type: response.data.type,
              position: {
                x:
                  typeof response.data.position.x === 'number'
                    ? response.data.position.x
                    : parseInt(response.data.position.x), // REMINDER: We expect to receive a number here from the server. If we don't, it will break the Edges spawning upon load.
                y:
                  typeof response.data.position.y === 'number'
                    ? response.data.position.y
                    : parseInt(response.data.position.y),
              },
              data: {
                label: response.data.branchName,
                text: '',
              },
            }
            // setNodes(response.data)

            setNodes((prevNodes: INodeInfo[]) => [...prevNodes, newBranch])
            /* setNodes((nds: INode[]) => nds.concat(newBranch)) // alternative option */

            console.log(
              'Created new branch node - response.data',
              response.data
            )
          })
      }
      if (type === NODE_TYPE.LeftLeaf || type === NODE_TYPE.RightLeaf) {
        const response = await axios
          .post(`http://localhost:8080/trees/${treeId}/unlinkedLeaves`, {
            leafId: newNode.id,
            treeId: tree._id,
            position: newNode.position,
            type: newNode.type,
            leafName: newNode.data.label,
          })
          .then((response) => {
            // A single branch will be returned in the response

            const newLeaf = {
              id: response.data.leafId,
              type: response.data.type,
              position: {
                x:
                  typeof response.data.position.x === 'number'
                    ? response.data.position.x
                    : parseInt(response.data.position.x), // REMINDER: We expect to receive a number here from the server. If we don't, it will break the Edges spawning upon load.
                y:
                  typeof response.data.position.y === 'number'
                    ? response.data.position.y
                    : parseInt(response.data.position.y),
              },
              data: {
                label: response.data.leafName,
                text: '',
              },
            }
            // setNodes(response.data)

            setNodes((prevNodes: INodeInfo[]) => [...prevNodes, newLeaf])
            /* setNodes((nds: INode[]) => nds.concat(newLeaf)) // alternative option */

            console.log('Created new leaf node - response.data', response.data)
          })
      }
    },
    [reactFlowInstance, setNodes]
  )

  const [hasNodes, setHasNodes] = useState<boolean>(false)
  const [hasEdges, setHasEdges] = useState<boolean>(false)

  useEffect(() => {
    if (nodes.length > 0) {
      console.log('HAS NODES')
      setHasNodes(true)
    }
  }, [nodes])

  useEffect(() => {
    if (edges.length > 0) {
      console.log('HAS EDGES')
      setHasEdges(true)
    }
  }, [edges])

  return (
    <div className="dndflow" style={{ height: '100vh' }}>
      <InputContext.Provider value={inputRef}>
        <div className="React-Flow-Container">
          <ReactFlowProvider>
            <div
              className="reactflow-wrapper absolute inset-0"
              ref={reactFlowWrapper}
            >
              {/* TERNARY TO RENDER ??? */}
              <div style={{ height: '100vh', width: '100%' }}>
                <ReactFlow
                  key={`${hasNodes}-${hasEdges}`}
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
                    setSelected(null)
                  }}
                  onNodeDoubleClick={(event, node) => {
                    if (treeMode === TREE_MODE.Editor) {
                      inputRef.current?.focus()
                      inputRef.current?.select()
                    } // setMarked(node)
                  }}
                  onNodeClick={(event, node) => {
                    if (treeMode === TREE_MODE.Reader) setMarked(node)
                    setSelected(node)
                  }}
                  fitView
                >
                  {treeMode === TREE_MODE.Editor ? (
                    <Background />
                  ) : (
                    <Background variant={BackgroundVariant.Lines} />
                  )}
                  <Controls />
                </ReactFlow>
              </div>
              <MiniMap />
            </div>
            <Field treeMode={treeMode} setTreeMode={setTreeMode} />
            {/* OLD EDIT MODE SELECT FOR THE ROADMAP EDITOR */}
            {/* <Option option={option} setOption={setOption} openBottomSheet={openBottomSheet} /> */}
            {treeMode === TREE_MODE.Editor ? (
              <Custom
                selected={selected}
                setNodes={setNodes}
                setMarked={setMarked}
                treeMode={treeMode}
              />
            ) : (
              <div></div>
            )}
            <Markdown
              marked={marked}
              setMarked={setMarked}
              setNodes={setNodes}
              treeMode={treeMode}
            />
          </ReactFlowProvider>
        </div>
      </InputContext.Provider>
    </div>
  )
}
