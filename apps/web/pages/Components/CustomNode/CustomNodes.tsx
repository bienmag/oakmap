import React, { memo, useCallback } from 'react'
import { getConnectedEdges, Handle, Position, useReactFlow } from 'reactflow'
import Text from './Text'
const useValidatorFn = () => {
  const { getNode, getEdges } = useReactFlow()

  return useCallback(
    (connection) => {
      const edges = getConnectedEdges([getNode(connection.target)], getEdges())

      return !edges.length
    },
    [getNode, getEdges]
  )
}

export function rightLeafNode({ data }) {
  const leafText = data.text
  return (
    <div>
      <div
        className={
          'px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-700 w-36 ' +
          (leafText !== '' ? 'hover:bg-gray-200' : '')
        }
      >
        <Text data={data} />

        <Handle
          type="target"
          position={Position.Left}
          isValidConnection={useValidatorFn()}
          className="w-16 !bg-green-700"
        />
      </div>
    </div>
  )
}

export function leftLeafNode({ data }) {
  const leafText = data.text
  return (
    <div>
      <div
        className={
          'px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-700 w-36 ' +
          (leafText !== '' ? 'hover:bg-gray-200' : '')
        }
      >
        <Text data={data} />

        <Handle
          type="target"
          position={Position.Right}
          isValidConnection={useValidatorFn()}
          className="w-16 !bg-green-700"
        />
      </div>
    </div>
  )
}

export function BranchNode({ data }) {
  const branchText = data.text

  return (
    <div>
      <div
        className={
          'px-4 py-2 shadow-md rounded-md bg-white border-2 border-orange-900 w-40 ' +
          (branchText !== '' ? 'hover:bg-gray-200' : '')
        }
      >
        <Text data={data} />
        <Handle
          type="target"
          position={Position.Top}
          className="w-16 h-16 !bg-green-700"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-green-700"
        />
      </div>
    </div>
  )
}

export function RootNode({ data }) {
  return (
    <div>
      <div className="px-4 py-2 shadow-md rounded-md  border-2 border-green-600 bg-green-300 w-52 ">
        <Text data={data} />

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-green-700"
        />
      </div>
    </div>
  )
}

// export default memo(LeafNode, BranchNode);
