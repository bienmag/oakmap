import React, { memo, useCallback } from 'react'
import {
  Connection,
  Node,
  getConnectedEdges,
  Handle,
  Position,
  useReactFlow,
} from 'reactflow'
import { INodeInfo } from '../../Resources/Packages/RFlow/Custom'
import Text from './Text'

const useValidatorFn = () => {
  const { getNode, getEdges } = useReactFlow()

  return useCallback(
    (connection: Connection) => {
      if (connection.target === null) return false
      const node = getNode(connection.target)
      if (node === undefined) return false
      const edges = getConnectedEdges([node], getEdges())

      return !edges.length
    },
    [getNode, getEdges]
  )
}

interface LeafNodeProps {
  data: INodeInfo
}

export function RightLeafNode({ data }: LeafNodeProps) {
  const validator = useValidatorFn()
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
          isValidConnection={validator}
          className="!bg-green-700"
        />
      </div>
    </div>
  )
}

export function LeftLeafNode({ data }: LeafNodeProps) {
  const validator = useValidatorFn()
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
          isValidConnection={validator}
          className="!bg-green-700"
        />
      </div>
    </div>
  )
}

export function BranchNode({ data }: LeafNodeProps) {
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
          className="!bg-green-700"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-green-700"
        />
      </div>
    </div>
  )
}

export function RootNode({ data }: LeafNodeProps) {
  return (
    <div>
      <div className="px-4 py-2 shadow-md rounded-md  border-2 border-green-600 bg-green-300 w-52 ">
        <Text data={data} />

        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-green-700"
        />
      </div>
    </div>
  )
}

// export default memo(LeafNode, BranchNode);
