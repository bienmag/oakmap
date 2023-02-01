import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function Markdown({ marked, setMarked, setNode, option }) {
  const handleOnMarkDown = (e) => {
    setMarked('')
  }

  const [text, setText] = useState('')

  useEffect(() => {
    setNode((nds) =>
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
    console.log('marked: ', marked)
  }, [marked.id, text, setNode])

  useEffect(() => {
    setText(marked?.data?.text)
  }, [marked])

  return (
    <div>
      {!marked ? (
        <div></div>
      ) : (
        <div className="markdownBG" onClick={handleOnMarkDown}>
          <div onClick={(e) => e.stopPropagation()} className="markdown">
            {option === 'reader' ? (
              <ReactMarkdown>{text}</ReactMarkdown>
            ) : (
              <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                disabled={option === 'reader'}
              ></textarea>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Markdown
