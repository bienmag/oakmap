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

// TESTING IMPORT FROM RESOURCES
import {
  initialNodes,
  nodeTypes,
} from '../../../Resources/Packages/RFlow/RFlow'

import { useRouter } from 'next/router';


let id = 0
const getId = () => `node_${id++}`

export const InputContext = createContext(null)

/* SERVER SIDE DATA:
    {
        "_id": "63ebb297cfc76b14bf76d970",
        "treeName": "DummyTree",
        "date": "2023-02-14T16:11:03.045Z",
        "user": "Dumbo",
        "branches": [
            {
                "branchId": "node_000",
                "treeId": "63ebb297cfc76b14bf76d970",
                "position": {
                    "x": "0",
                    "y": "100"
                },
                "branchName": null,
                "leaves": []
            }
        ],
        "unlinkedLeaves": [
            {
                "leafId": "node_001",
                "treeId": "63ebb297cfc76b14bf76d970",
                "position": {
                    "x": "0",
                    "y": "200"
                },
                "leafName": null,
                "branchId": null
            }
        ]
    }



    EXAMPLE OF REACT FLOW DATA:
    Object { id: "node_1", type: "leftLeaf", width: 144, … }
​​
    data: Object { label: "hello", text: "" }
    ​​​
    label: "hello"   ****************
    ​​​
    text: ""   ***************
    ​​
    ​​
    dragging: false
    ​​
    height: 40
    ​​
    id: "node_1"  *************
    ​​
    position: Object { x: 0.2512756289281697, y: 195.53476157101872 }  **************
    ​​​
    x: 0.2512756289281697   ******************
    ​​​
    y: 195.53476157101872  *******************
    ​​​

    ​​
    positionAbsolute: Object { x: 0.2512756289281697, y: 195.53476157101872 } ************
    ​​​
    x: 0.2512756289281697   *************
    ​​​
    y: 195.53476157101872   ************

    ​​
    selected: false
    ​​
    type: "leftLeaf"  *************
    ​​
    width: 144
*/

export function TreeEditorMode({
  treeMode,
  setTreeMode,
  marked,
  setMarked,
  currentTreeId,
  setCurrentTreeId,
  nodes,
  setNodes,
  onNodesChange,
  setEdges
}: any) {
  const reactFlowWrapper = useRef(null)
  // moved nodes and edges state up to Sidebar for now
  const [isDraggable, setIsDraggable] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selected, setSelected] = useState('')

  // useRef for double click on node to focus on input text
  const inputRef: any = useRef(null)

  console.log('nodes: ', nodes)
  console.log('edges: ', edges)


  // ROUTER
  const router = useRouter()
  const { idRouter } = router.query

  
  useEffect(() => {
    setIsDraggable(treeMode === 'editor')
  }, [treeMode])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  // const onDragOver = useCallback(CBackOnDragOver, []);
  // const onDrop = useCallback(CBackOnDrop, [reactFlowInstance, setNodes])

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
                  if (treeMode === 'editor') {
                    inputRef.current.focus()
                    inputRef.current.select()
                  } // setMarked(node)
                }}
                onNodeClick={(event, node) => {
                  if (treeMode === 'reader') setMarked(node)
                  setSelected(node)
                }}
                fitView
              >
                {treeMode === 'editor' ? (
                  <Background />
                ) : (
                  <Background variant="lines" />
                )}
                <Controls />
              </ReactFlow>
              <MiniMap />
            </div>
            {/* OLD EDIT MODE SELECT FOR THE ROADMAP EDITOR */}

            {/* <Option option={option} setOption={setOption} openBottomSheet={openBottomSheet} /> */}

            {treeMode === 'editor' ? (
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

/* import DescriptionMenu from '../DescriptionMenu/DescriptionMenu'
import Option from '../Option/Option'
import {
  leftLeafNode,
  rightLeafNode,
  BranchNode,
  RootNode,
} from '../CustomNode/CustomNodes' */

// CODE TO REMOVE IF THE RFLOW/RFLOW FILE WORKS
/* import {
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
] */


