import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { EDITOR, NODE_TYPE, READER } from '../../Resources/Enums/Options'
import {
  handleSetNode,
  INodeInfo,
  TreeMode,
} from '../../Resources/Packages/RFlow/Custom'
import {
  allButtonTypes,
  CBackInsertText,
} from '../../Resources/Packages/RFlow/Markdown'
import { v4 as uuidv4 } from 'uuid'
import { Node } from 'reactflow'
import { useRouter } from 'next/router'
import axios from 'axios'

interface IMarkdownProps {
  marked: Node<INodeInfo> | null
  setMarked: React.Dispatch<React.SetStateAction<Node<INodeInfo> | null>>
  setNodes: React.Dispatch<React.SetStateAction<Node<INodeInfo>[]>>
  treeMode: TreeMode
}


function Markdown({ marked, setMarked, setNodes, treeMode }: IMarkdownProps) {
  const router = useRouter()
  const objtreeId = router.query
  const treeId = Object.values(objtreeId)[0]

  const createMD = async () => {
    if (marked === null) return
    if (marked.type === NODE_TYPE.Branch) {
      const response = await axios
        .put(`http://localhost:8080/trees/${treeId}/branches`,
          {
            branchId: marked.id,
            markdownText: text
          })
        .catch((error) => {
          console.log('Error adding markdown:', error)
        })
    }
    if (
      marked.type === NODE_TYPE.LeftLeaf ||
      marked.type === NODE_TYPE.RightLeaf
    ) {

      const response = await axios
        .put(`http://localhost:8080/trees/${treeId}/unlinkedLeaves`,
          {
            leafId: marked.id,
            markdownText: text
          }
        )
        .catch((error) => {
          console.log('Error adding markdown:', error)
        })
    }
  }



  const handleBackgroundClick = (e: React.MouseEvent) => {
    createMD()
    setMarked(null)
  }

  const [text, setText] = useState('')
  const [mdText, setMDText] = useState('')

  const getMD = async () => {



    if (marked === null) return
    if (marked.type === NODE_TYPE.Branch) {
      const nodeId = marked.id
      const response = await axios
        .get(`http://localhost:8080/markdown/${nodeId}`)
        .catch((error) => {
          console.log('There is no markdown:', error)
        })
      setMDText(response?.data.markdownText)

    }
    if (
      marked.type === NODE_TYPE.LeftLeaf ||
      marked.type === NODE_TYPE.RightLeaf
    ) {
      const nodeId = marked.id
      const response = await axios
        .get(`http://localhost:8080/markdown/${nodeId}`)
        .catch((error) => {
          console.log('There is no markdown:', error)
        })
      setMDText(response?.data.markdownText)
    }
  }

  useEffect(() => {
    if (marked === null) return
    handleSetNode(setNodes, marked, { text: text })
  }, [marked, text, setNodes])

  useEffect(() => {
    // setText(marked === null ? '' : text)
    setText(marked === null ? '' : mdText)
  }, [marked])

  // Text Formatting Buttons function
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (insertion: string) =>
    CBackInsertText(textAreaRef, setText, insertion)

  getMD()

  //reader and no text
  if (
    marked === null ||
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
          <ReactMarkdown>{mdText}</ReactMarkdown>
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
          <div className="flex-markdown flex justify-center">
            <textarea
              className="text-area-style w-auto"
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
        <p>
          This thing crashed terribly. Our devs are in panic and running to
          their homes to their moms. Brace yourselves.
        </p>
      </>
    )
  }
}

export default Markdown
