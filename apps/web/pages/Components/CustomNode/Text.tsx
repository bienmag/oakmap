import React from 'react'

function Text({ data }) {
  return (
    <div className="flex justify-center text-center">
      <div className="ml-2">
        <div className="text-sm font-bold">{data.label}</div>
      </div>
    </div>
  )
}

export default Text
