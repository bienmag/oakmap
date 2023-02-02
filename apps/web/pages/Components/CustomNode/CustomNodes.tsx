import React, { memo } from 'react'
import { Handle, Position } from 'reactflow';


export function LeafNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-700 w-36 
    ">
      <div className="flex justify-center text-center">
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-green-700" />
    </div >
  )
}


export function BranchNode({ data }) {

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-orange-900 w-40
    ">
      <div className="flex justify-center text-center">
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 h-16 !bg-green-700" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-700" />
    </div >
  )
}

export function RootNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-600 bg-green-300 w-52
    ">
      <div className="flex justify-center text-center">
        <div className="ml-2 ">
          <div className="text-sm font-bold">{data.label}</div>

        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-700" />
    </div >
  )
}

// export default memo(LeafNode, BranchNode);
