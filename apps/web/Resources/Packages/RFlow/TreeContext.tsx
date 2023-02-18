import { createContext, useContext } from 'react'
import { INode, INodeInfo, ITree } from './Custom'

export interface ITreeContext {
  tree: ITree
  initialNodes: INode[]
}

const TreeContext = createContext<ITreeContext>({
  tree: null,
  initialNodes: [],
})

export const useTreeContext = () => useContext(TreeContext)

export default TreeContext
