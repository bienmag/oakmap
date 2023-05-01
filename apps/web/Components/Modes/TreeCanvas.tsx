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
  NodeDragHandler,
  useStore,
  useOnSelectionChange,
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
import axios, { AxiosResponse } from 'axios'
import { NODE_TYPE, TREE_MODE } from '../../Resources/Enums/Options'
import { setegid } from 'process'
import { Console } from 'console'
import { useTreeContext } from '../../Resources/Packages/RFlow/TreeContext'
// import { TreeMode } from '../../Resources/Enums/Options'

import { v4 as uuidv4 } from 'uuid'

import {
  createNewBranchNode,
  createNewLeafNode,
  postNewBranch,
  postNewLeaf,
} from '../../Resources/Packages/RFlow/TreeRequests'

import Field from '../Field/Field'
import { Sidebar } from '../Sidebar/Sidebar'

// CODE

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
  const [selectedNode, setSelectedNode] = useState<Node<INodeInfo> | null>(null)
  const [selectedData, setSelectedData] = useState<string>('') // contains the name
  const [marked, setMarked] = useState<Node<INodeInfo> | null>(null)

  // useRef for double click on node to focus on input text
  const inputRef = useRef<HTMLInputElement>(null)

  const [treeMode, setTreeMode] = useState(TREE_MODE.Editor)

  // Import State for Nodes and Edges from NodesContext
  const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange } =
    useContext(NodesContext)

  console.log('nodes: ', nodes)
  console.log('edges: ', edges)

  useEffect(() => {
    setIsDraggable(treeMode === TREE_MODE.Editor)
  }, [treeMode])

  // TREE ID

  const treeId = tree._id

  // POST REQUEST FOR EDGES

  const onConnect: OnConnect = useCallback(
    async (params) => {
      console.log('Edge onConnect params: ', params)

      const response = await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/edges`, {
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
    },
    [setEdges, treeId]
  )

  //////////////////////////////////////////
  //////////////// NODES ///////////////////
  //////////////////////////////////////////

  // UPDATE FOR CHANGING TEXT ON A NODE

  const handleUpdateNode = useCallback(
    async (
      node: Node<INodeInfo, string | undefined> | null,
      selectedData: string
    ) => {
      if (node === null) {
        console.log('Node is null!')
      }
      // BRANCH
      else if (node !== null) {
        if (node.type === NODE_TYPE.Branch) {
          // node !== null &&
          // && node.data.label !== ''
          try {
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/branches`,
              {
                branchId: node.id,
                treeId: tree._id,
                position: node.position,
                type: node.type,
                branchName: selectedData,
                // branchName: node.data.label ? node.data.label : null,
              }
            )
            console.log('node.data.label: ', node.data.label)
            console.log('Update branch with selectedData: ', selectedData)
            console.log('Update branch with text from response: ', response)
          } catch (error) {
            console.error('Failed to update branch node', error)
            throw error
          }
        }
        // LEAF
        if (
          (node !== null && node.type === NODE_TYPE.LeftLeaf) ||
          (node !== null && node.type === NODE_TYPE.RightLeaf)
        ) {
          try {
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/unlinkedLeaves`,
              {
                leafId: node.id,
                treeId: tree._id,
                position: node.position,
                type: node.type,
                leafName: selectedData,
                // leafName: node.data.label,
              }
            )
            // PROBLEM -- I think we're sending this request before we have set the node.data.label in the state
            console.log('node.data.label: ', node.data.label)
            console.log('Update leaf with selectedData: ', selectedData)
            console.log('Updated leaf with text from response: ', response)
          } catch (error) {
            console.log('Failed to update leaf node', error)
          }
        }
        if (node !== null && node.type === NODE_TYPE.Root) {
          console.log('Sorry, root node cannot be updated at the moment!')
        }
      }
    },
    [tree, treeId]
  )

  // UPDATE FOR DRAGGING AN EXISTING NODE
  const handleNodeDragStop: NodeDragHandler = async (event, node) => {
    if (node.type === NODE_TYPE.Branch) {
      console.log('THIS IS THE DRAGGED BRANCH: ', node)

      // REFACTOR IDEA -- Unused due to issue with node typescript
      /*  try {
        const response = await updateBranch(tree, treeId, node)
      } catch (error) {
        console.log('Error updating branch position:', error)
      } */

      // IF DRAGGING A BRANCH
      const response = await axios
        .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/branches`, {
          branchId: node.id,
          treeId: tree._id,
          position: node.position,
          type: node.type,
          branchName: node.data.label,
        })
        .catch((error) => {
          console.log('Error updating branch position:', error)
        })
    }

    // IF DRAGGING A LEAF
    if (node.type === NODE_TYPE.LeftLeaf || node.type === NODE_TYPE.RightLeaf) {
      console.log('THIS IS THE DRAGGED LEAF: ', node)

      const response = await axios
        .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/unlinkedLeaves`, {
          leafId: node.id,
          treeId: tree._id,
          position: node.position,
          type: node.type,
          leafName: node.data.label,
        })
        .catch((error) => {
          console.log('Error updating leaf position:', error)
        })
    }
  }

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
        draggable: true,
      }

      /* setNodes((nds: INode[]) => nds.concat(newLeaf)) // alternative option */
      // POST REQUESTS FOR NEW BRANCHES AND LEAVES

      if (type === NODE_TYPE.Branch) {
        try {
          const response = await postNewBranch(tree, treeId, newNode)
          const branchData = response.data
          const newBranch = await createNewBranchNode(branchData)
          setNodes((prevNodes: INodeInfo[]) => [...prevNodes, newBranch])
          console.log(
            `Created a new ${NODE_TYPE.Branch} node -- All Nodes: `,
            nodes
          )
        } catch (error) {
          console.error(error)
        }
      }

      if (type === NODE_TYPE.LeftLeaf) {
        try {
          const response = await postNewLeaf(tree, treeId, newNode)
          const leafData = response.data
          const newBranch = await createNewLeafNode(leafData)
          setNodes((prevNodes: INodeInfo[]) => [...prevNodes, newBranch])
          console.log(
            `Created a new ${NODE_TYPE.LeftLeaf} node -- All Nodes: `,
            nodes
          )
        } catch (error) {
          console.error(error)
        }
      }

      if (type === NODE_TYPE.RightLeaf) {
        try {
          const response = await postNewLeaf(tree, treeId, newNode)
          const leafData = response.data
          const newBranch = await createNewLeafNode(leafData)
          setNodes((prevNodes: INodeInfo[]) => [...prevNodes, newBranch])
          console.log(
            `Created a new ${NODE_TYPE.RightLeaf} node -- All Nodes: `,
            nodes
          )
        } catch (error) {
          console.error(error)
        }
      }
    },
    [reactFlowInstance, setNodes, nodes, tree, treeId]
  )

  const [hasNodes, setHasNodes] = useState<boolean>(false)
  const [hasEdges, setHasEdges] = useState<boolean>(false)

  return (
    <Sidebar>
      <div className="dndflow" style={{ height: '100%' }}>
        <InputContext.Provider value={inputRef}>
          <div className="React-Flow-Container">
            <ReactFlowProvider>
              <div
                className="reactflow-wrapper absolute inset-0"
                ref={reactFlowWrapper}
              >
                {/* TERNARY TO RENDER ??? */}
                <div style={{ height: '100%', width: '100%' }}>
                  <ReactFlow
                    key={`${hasNodes}-${hasEdges}`}
                    nodes={nodes}
                    edges={edges}
                    nodesDraggable={isDraggable}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={handleNodeDragStop}
                    /* elements={elements}
                  onElementClick={onElementClick}
                  onBackgroundClick={handleDeselect} */
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    deleteKeyCode={null}
                    onDragOver={onDragOver}
                    onPaneClick={async () => {
                      await handleUpdateNode(selectedNode, selectedData)
                      setSelectedData('')
                      setSelectedNode(null)
                      setSelected(null)
                      console.log('CLICKED BACKGROUND')
                      console.log('SELECTED: ', selected)
                    }}
                    onNodeDoubleClick={(event, node) => {
                      if (treeMode === TREE_MODE.Editor) {
                        inputRef.current?.focus()
                        inputRef.current?.select()
                      } // setMarked(node)
                    }}
                    onNodeClick={async (event, node) => {
                      if (treeMode === TREE_MODE.Reader) setMarked(node)
                      if (selectedData !== '') {
                        await handleUpdateNode(selectedNode, selectedData)
                      }
                      setSelected(node)
                      setSelectedNode(node)
                      console.log('SELECTED A NODE: ', selected)
                      console.log('selected data: ', selectedData)
                    }}
                    fitView
                  >
                    <Field treeMode={treeMode} setTreeMode={setTreeMode} />
                    {treeMode === TREE_MODE.Editor ? (
                      <Background />
                    ) : (
                      <Background variant={BackgroundVariant.Lines} />
                    )}

                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </div>
              </div>

              {/* OLD EDIT MODE SELECT FOR THE ROADMAP EDITOR */}
              {/* <Option option={option} setOption={setOption} openBottomSheet={openBottomSheet} /> */}
              {treeMode === TREE_MODE.Editor && (
                <Custom
                  selected={selected}
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                  setNodes={setNodes}
                  setMarked={setMarked}
                  treeMode={treeMode}
                  treeId={treeId}
                />
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
    </Sidebar>
  )
}

// useEffect(() => {
//   if (nodes.length > 0) {
//     console.log('HAS NODES')
//     setHasNodes(true)
//   }
// }, [nodes])

// useEffect(() => {
//   if (edges.length > 0) {
//     console.log('HAS EDGES')
//     setHasEdges(true)
//   }
// }, [edges])
