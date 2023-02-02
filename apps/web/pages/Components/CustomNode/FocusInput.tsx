import React, { useRef, useState, useEffect } from 'react'

function FocusInput({ data }) {
  const [input, setInput] = useState("")
  useEffect(() => {
    setInput(data.label)
  }, [data.label])
  useEffect(() => {
    data.label = input
  }, [input])
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="flex justify-center text-center">
      <div className="ml-2">
        <div className="text-sm font-bold"><input type="text" className="" onChange={e => handleInput(e)} value={input} /></div>
      </div>
    </div>
  )
}

export default FocusInput