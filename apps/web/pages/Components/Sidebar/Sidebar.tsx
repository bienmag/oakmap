// import React from 'react'

// export default function Sidebar({ option }) {
//   const onDragStart = (event, nodeType) => {
//     event.dataTransfer.setData('application/reactflow', nodeType)
//     if (option === 'creator') event.dataTransfer.effectAllowed = 'move'
//     else event.dataTransfer.effectAllowed = 'none'
//   }

//   return (
//     <aside>
//       <div className="description">
//         You can drag these nodes to the pane on the right.
//       </div>
//       <div
//         className="dndnode"
//         onDragStart={(event) => onDragStart(event, 'branch')}
//         draggable
//       >
//         Branch
//       </div>

//       <div
//         className="dndnode output"
//         onDragStart={(event) => onDragStart(event, 'leftLeaf')}
//         draggable
//       >
//         Left Leaf
//       </div>
//       <div
//         className="dndnode output"
//         onDragStart={(event) => onDragStart(event, 'rightLeaf')}
//         draggable
//       >
//         Right Leaf
//       </div>
//     </aside>
//   )
// }
