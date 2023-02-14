import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { EDITOR, READER } from '../../Resources/Enums/Options'
import { handleSetNode, INodeInfo, TreeMode } from '../../Resources/Packages/RFlow/Custom'
import {
  allButtonTypes,
  CBackInsertText,
} from '../../Resources/Packages/RFlow/Markdown'
import { v4 as uuidv4 } from 'uuid'
import { Node } from 'reactflow'

interface IMarkdownProps {
  marked: Node<INodeInfo>,
  setMarked: React.Dispatch<React.SetStateAction<Node<INodeInfo> | null>>
  setNodes: React.Dispatch<React.SetStateAction<Node<INodeInfo>[]>>
  treeMode: TreeMode
}

function Markdown({ marked, setMarked, setNodes, treeMode }: IMarkdownProps) {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    setMarked(null)
  }

  const [text, setText] = useState('')

  useEffect(() => {
    handleSetNode(setNodes, marked, { text: text })
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
    (marked && treeMode === READER && marked.data.text === '') ||
    marked.data?.text === undefined
  ) {
    return <div></div>
  }

  //reader and text
  else if (marked && treeMode === READER && marked.data.text !== '') {
    return (
      <>
        <div className="markdownBG" onClick={handleBackgroundClick}></div>
        <div className="markdown">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </>
    )
  }

  // creator
  else if (marked && treeMode === EDITOR) {
    return (
      <>
        <div className="markdownBG" onClick={handleBackgroundClick}></div>
        <div className="markdown">
          <div className="flex-markdown">
            <textarea
              className="text-area-style"
              onChange={(e) => setText(e.target.value)}
              value={text}
              disabled={false}
              ref={textAreaRef}
            ></textarea>
            <div className="markdown-buttons">
              {allButtonTypes.map((btn) => (
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
  } else {
    return (
      <>
        <p>This thing crashed terribly. Our devs are in panic and running to their homes to their moms. Brace yourselves.</p>
      </>
    )
  }
}

export default Markdown
