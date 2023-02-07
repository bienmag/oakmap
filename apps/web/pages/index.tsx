import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
} from 'react'
import 'reactflow/dist/style.css'
import { Sidebar } from './Components/Sidebar/Sidebar'


/////////////////////////////////////////////
// SIDEBAR STUFF ///////////////////////////
////////////////////////////////////////////
  
  
const DnDFlow = () => {

  return (
    <div>
      <Sidebar />
    </div>
    
  )
}

export default DnDFlow








// return (
//     <div className="dndflow" style={{ height: '100vh' }}>
//       <InputContext.Provider value={inputRef}>
//         <ReactFlowProvider>
//           <div
//             className="reactflow-wrapper absolute inset-0"
//             ref={reactFlowWrapper}
//           >
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               nodesDraggable={isDraggable}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               nodeTypes={nodeTypes}
//               onInit={setReactFlowInstance}
//               onDrop={onDrop}
//               deleteKeyCode={null}
//               onDragOver={onDragOver}
//               onPaneClick={() => {
//                 setSelected('')
//               }}
//               onNodeDoubleClick={(event, node) => {
//                 if (option === 'creator') {
//                   inputRef.current.focus()
//                   inputRef.current.select()

//                 } // setMarked(node)
//               }}
//               onNodeClick={(event, node) => {
//                 if (option === 'reader') setMarked(node)
//                 setSelected(node)
//               }}
//               fitView
//             >

//               {option === 'creator' ? (
//                 <Background />) : (<Background variant='lines' />)
//               }
//               <Controls />
//             </ReactFlow>
//             <MiniMap />
//           </div>
//           <Option option={option} setOption={setOption} openBottomSheet={openBottomSheet} />
//           {/* <Sidebar option={option} /> */}
//           {option === 'creator' ? (
//             <Custom
//               selected={selected}
//               setNodes={setNodes}
//               setMarked={setMarked}
//               option={option}
//             />
//           ) : (
//             <div></div>
//           )}
//           <Markdown
//             marked={marked}
//             setMarked={setMarked}
//             setNodes={setNodes}
//             selected={selected}
//             option={option}
//           />
//         </ReactFlowProvider>
//       </InputContext.Provider>
//       <div>
//         <DescriptionMenu
//           isOpen={isOpen}
//           closeBottomSheet={closeBottomSheet}
//           setDescription={setDescription}
//           description={description}
//           option={option}
//         />
//       </div >
//     </div >
//   )

  