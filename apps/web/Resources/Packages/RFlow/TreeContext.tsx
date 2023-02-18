import { createContext, useContext } from 'react'
import { IEdge, INode, INodeInfo, ITree } from './Custom'

export interface ITreeContext {
  tree: ITree | null
  initialNodes: INode[]
  initialEdges: IEdge[]
}

const TreeContext = createContext<ITreeContext>({
  tree: null,
  initialNodes: [],
  initialEdges: [],
})

export const useTreeContext = () => useContext(TreeContext)

export default TreeContext
