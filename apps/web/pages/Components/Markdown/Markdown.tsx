import React, { useState, useEffect, useRef } from 'react'
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

  // Text Formatting Buttons function
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (insertion: string) => {
    const { current: textArea } = textAreaRef
    const start = textArea.selectionStart
    const end = textArea.selectionEnd
    const text = textArea.value
    setText(text.slice(0, start) + insertion + text.slice(end) + '\n')
  }

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
              <div className="flex-markdown">
                <textarea
                  className="text-area-style"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  type="text"
                  disabled={option === 'reader'}
                  ref={textAreaRef}
                ></textarea>
                <div className="markdown-buttons">
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={() => insertText('# Headline')}
                  >
                    Headline
                  </button>
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={() =>
                      insertText('[title](https://www.google.com)')
                    }
                  >
                    Link
                  </button>
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={() => insertText('**Bold**')}
                  >
                    Bold
                  </button>
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={() => insertText('*Italics*')}
                  >
                    Italics
                  </button>
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={() =>
                      insertText('* List Item 1\n* List Item 2\n* List Item 3')
                    }
                  >
                    List
                  </button>
                  <button
                    className="custom-button hover:bg-blue-400"
                    onClick={() => insertText('`Code`')}
                  >
                    Code
                  </button>
                  {/* Add more buttons for other formatting options */}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Markdown
