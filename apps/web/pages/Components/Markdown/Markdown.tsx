import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function Markdown({ marked, setMarked, setNodes, option }) {
  const handleOnMarkDown = (e) => {
    setMarked('')
  }

  const [text, setText] = useState('')

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === marked.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            text: text,
          }
        }

        return node
      })
    )
  }, [marked.id, text, setNodes])

  useEffect(() => {
    setText(marked?.data?.text)
  }, [marked])

  return (
    <div>
      {!marked ? (
        <div></div>
      ) : (
        <>
          <div className="markdownBG" onClick={handleOnMarkDown}></div>
          <div className="markdown">
            {option === 'reader' ? (
              <ReactMarkdown>{text}</ReactMarkdown>
            ) : (
              <textarea
                className="text-area-style"
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                style={
                  {
                    /* minHeight: 256, */
                  }
                }
                disabled={option === 'reader'}
              ></textarea>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Markdown
