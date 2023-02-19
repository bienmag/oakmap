import React from 'react'
import { INodeInfo, IEdgeInfo, INode } from './Custom'
// import { initialNodes } from './RFlow'
import ReactFlow, { useNodesState, useEdgesState, Node } from 'reactflow'
import TreeContext, { useTreeContext } from './TreeContext'

export const NodesContext = React.createContext<any>({})

export const NodesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { initialNodes, initialEdges } = useTreeContext()

  const [nodes, setNodes, onNodesChange] =
    useNodesState<INodeInfo>(initialNodes) // initialNodes === undefined ? placeholderNodes : initialNodes

  const [edges, setEdges, onEdgesChange] =
    useEdgesState<IEdgeInfo[]>(initialEdges) // useEdgesState<IEdgeInfo[]>([]) // useEdgesState<IEdgeInfo[]>(initialedges)

  return (
    <NodesContext.Provider
      value={{ nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange }}
    >
      {children}
    </NodesContext.Provider>
  )
}

/* const placeholderNodes = [
    {
      id: 'node_000',
      type: 'default',
      position: { x: 0, y: 0 },
      data: { label: 'ERROR DID NOT LOAD', text: '' },
    },
  ] */
