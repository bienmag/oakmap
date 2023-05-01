import axios, { AxiosResponse } from 'axios'
import { IBranch, ILeaf, INode, INodeInfo, ITree } from './Custom'
import { useContext } from 'react'
import { NodesContext } from './NodesContext'

export async function postNewBranch(
  tree: any,
  treeId: string,
  newNode: INode
): Promise<AxiosResponse<IBranch>> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/branches`,
      {
        branchId: newNode.id,
        treeId: tree._id,
        position: newNode.position,
        type: newNode.type,
        branchName: newNode.data.label,
      }
    )
    // A single branch will be returned in the response
    return response
  } catch (error) {
    console.error('Failed to create a new branch node', error)
    throw error
  }
}

export async function createNewBranchNode(data: IBranch) {
  const newBranch = {
    id: data.branchId,
    type: data.type,
    position: {
      x:
        typeof data.position.x === 'number'
          ? data.position.x
          : parseInt(data.position.x), // REMINDER: We expect to receive a number here from the server. If we don't, it will break the Edges spawning upon load.
      y:
        typeof data.position.y === 'number'
          ? data.position.y
          : parseInt(data.position.y),
    },
    data: {
      label: data.branchName,
      text: '',
    },
  }

  return newBranch
}

export async function postNewLeaf(
  tree: any,
  treeId: string,
  newNode: INode
): Promise<AxiosResponse<ILeaf>> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/unlinkedLeaves`,
      {
        leafId: newNode.id,
        treeId: tree._id,
        position: newNode.position,
        type: newNode.type,
        leafName: newNode.data.label,
      }
    )
    // A single leaf will be returned in the response
    return response
  } catch (error) {
    console.error('Failed to create a new leaf node', error)
    throw error
  }
}

export async function createNewLeafNode(data: ILeaf) {
  const newLeaf = {
    id: data.leafId,
    type: data.type,
    position: {
      x:
        typeof data.position.x === 'number'
          ? data.position.x
          : parseInt(data.position.x), // REMINDER: We expect to receive a number here from the server. If we don't, it will break the Edges spawning upon load.
      y:
        typeof data.position.y === 'number'
          ? data.position.y
          : parseInt(data.position.y),
    },
    data: {
      label: data.leafName,
      text: '',
    },
  }

  return newLeaf
}

/* export async function updateBranch(
  tree: any,
  treeId: string,
  node: INode
): Promise<AxiosResponse<IBranch>> {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trees/${treeId}/branches`,
      {
        branchId: node.id,
        treeId: tree._id,
        position: node.position,
        type: node.type,
        branchName: node.data.label,
      }
    )
    return response
  } catch (error) {
    console.error('Failed to update branch node', error)
    throw error
  }
} */

/* export function TreeRequests() {
  const { nodes, setNodes, onNodesChange } = useContext(NodesContext)
} */

/* const newBranchInfo: INode = {
        id: newBranch.id,
        type: newBranch.type,
        position: newBranch.position,
        data: newBranch.data,
      }
 */
