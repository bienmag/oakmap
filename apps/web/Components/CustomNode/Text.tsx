import React from 'react'
import { INodeInfo } from '../../Resources/Packages/RFlow/Custom'

interface TextProps {
  data: INodeInfo
}
function Text({ data }: TextProps) {
  return (
    <div className="Gill-Sans flex justify-center text-center">
      <div className="ml-2">
        <div className="text-sm font-bold">{data.label}</div>
      </div>
    </div>
  )
}

export default Text
