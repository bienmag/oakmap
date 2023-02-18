import { createContext, useContext } from 'react'
import { IEdge, INode, INodeInfo, ITree } from './Custom'

export interface ITreeContext {
  tree: ITree
  initialNodes: INode[] // | undefined
  initialEdges: IEdge[]
}

const TreeContext = createContext<ITreeContext>({
  tree: null,
  initialNodes: [], // undefined,
  initialEdges: [],
})

export const useTreeContext = () => useContext(TreeContext)

export default TreeContext
