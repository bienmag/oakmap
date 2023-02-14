import React from 'react'
import { Node } from 'reactflow'
import { INodeInfo } from '../../../Resources/Packages/RFlow/Custom'

function Text({ data }: Node<INodeInfo>) {
  return (
    <div className="flex justify-center text-center">
      <div className="ml-2">
        <div className="text-sm font-bold">{data.label}</div>
      </div>
    </div>
  )
}

export default Text
