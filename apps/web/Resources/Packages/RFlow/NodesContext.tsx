import React from 'react'
import { INodeInfo, IEdgeInfo } from './Custom'
import { initialNodes } from './RFlow'
import ReactFlow, { useNodesState, useEdgesState, Node } from 'reactflow'


export const NodesContext = React.createContext<any>({})

export const NodesContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState<INodeInfo>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<IEdgeInfo[]>([])

  return (
    <NodesContext.Provider value={{ nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange }}>
      {children}
    </NodesContext.Provider>
  );
};