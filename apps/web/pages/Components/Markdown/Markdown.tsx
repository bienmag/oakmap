import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { CREATOR, READER } from '../../../Resources/Enums/Options'
import { handleSetNode } from '../../../Resources/Packages/RFlow/Custom'
import {
  allbuttonTypes,
  CBackInsertText,
} from '../../../Resources/Packages/RFlow/Markdown'
import { v4 as uuidv4 } from 'uuid'
function Markdown({ marked, setMarked, setNodes, option }) {
  const handleOnMarkDown = (e) => {
    setMarked('')
  }

  const [text, setText] = useState('')

  useEffect(() => {
    handleSetNode(setNodes, marked, { text })
  }, [marked.id, text, setNodes])

  useEffect(() => {
    setText(marked?.data?.text)
  }, [marked])

  // Text Formatting Buttons function
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (insertion: string) =>
    CBackInsertText(textAreaRef, setText, insertion)

  //reader and no text
  if (
    (marked && option === READER && marked.data.text === '') ||
    marked.data?.text === undefined
  ) {
    return <div></div>
  }

  //reader and text
  else if (marked && option === READER && marked.data.text !== '') {
    return (
      <>
        <div className="markdownBG" onClick={handleOnMarkDown}></div>
        <div className="markdown">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </>
    )
  }

  // creator
  else if (marked && option === CREATOR) {
    return (
      <>
        <div className="markdownBG" onClick={handleOnMarkDown}></div>
        <div className="markdown">
          <div className="flex-markdown">
            <textarea
              className="text-area-style"
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              disabled={option === READER}
              ref={textAreaRef}
            ></textarea>
            <div className="markdown-buttons">
              {allbuttonTypes.map((btn) => (
                <button
                  key={uuidv4()}
                  className="custom-button hover:bg-blue-400"
                  onClick={() => insertText(btn.markdown)}
                >
                  {btn.name}
                </button>
              ))}
              {/* Add more buttons for other formatting options */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Markdown
