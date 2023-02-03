import React, { memo, useCallback } from 'react'
import { getConnectedEdges, Handle, Position, useReactFlow } from 'reactflow';


const useValidatorFn = () => {
  const { getNode, getEdges } = useReactFlow()

  return useCallback((connection) => {
    const edges = getConnectedEdges([getNode(connection.target)], getEdges())

    return !edges.length
  },
    [getNode, getEdges])
}



export function LeafNode({ data }) {

  const leafText = data.text
  return (
    <div>
      {leafText !== "" ? (<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-700 w-36  hover:bg-gray-200
    ">
        <div className="flex justify-center text-center">
          <div className="ml-2">
            <div className="text-sm font-bold">{data.label}</div>
          </div>
        </div>

        <Handle type="target" position={Position.Top} isValidConnection={useValidatorFn()} className="w-16 !bg-green-700" />
      </div >) : (<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-700 w-36  
    ">
        <div className="flex justify-center text-center">
          <div className="ml-2">
            <div className="text-sm font-bold">{data.label}</div>
          </div>
        </div>

        <Handle type="target" position={Position.Top} isValidConnection={useValidatorFn()} className="w-16 !bg-green-700" />
      </div >)}

    </div>

  )
}


export function BranchNode({ data }) {

  const branchText = data.text


  return (
    <div>
      {branchText !== "" ? (<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-orange-900 w-40 hover:bg-gray-200
    ">
        <div className="flex justify-center text-center">
          <div className="ml-2">
            <div className="text-sm font-bold">{data.label}</div>
          </div>
        </div>
        <Handle type="target" position={Position.Top} className="w-16 h-16 !bg-green-700" />
        <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-700" />
      </div >) : (<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-orange-900 w-40 
    ">
        <div className="flex justify-center text-center">
          <div className="ml-2">
            <div className="text-sm font-bold">{data.label}</div>
          </div>
        </div>
        <Handle type="target" position={Position.Top} className="w-16 h-16 !bg-green-700" />
        <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-700" />
      </div >)}
    </div>



  )
}

export function RootNode({ data }) {

  const rootText = data.text

  return (
    <div>
      {rootText !== undefined ? (<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-600 bg-green-300 w-52 hover:bg-green-400 
    ">
        <div className="flex justify-center text-center">
          <div className="ml-2 ">
            <div className="text-sm font-bold">{data.label}</div>
          </div>
        </div>

        <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-700" />
      </div >) : (<div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-600 bg-green-300 w-52 
    ">
        <div className="flex justify-center text-center">
          <div className="ml-2 ">
            <div className="text-sm font-bold">{data.label}</div>

          </div>
        </div>

        <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-700" />
      </div >)
      }

    </div>

  )
}

// export default memo(LeafNode, BranchNode);
