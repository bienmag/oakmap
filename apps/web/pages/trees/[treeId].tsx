// /trees/
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { NodesContextProvider } from '../../Resources/Packages/RFlow/NodesContext'
import { TreeCanvas } from '../../Components/Modes/TreeCanvas'
import {
  IBranch,
  IEdge,
  IEdgeServer,
  ILeaf,
  INode,
  ITree,
} from '../../Resources/Packages/RFlow/Custom'
import TreeContext from '../../Resources/Packages/RFlow/TreeContext'

interface TreePageProps {
  tree: ITree
  initialNodes: INode[]
  initialEdges: IEdge[]
}

export default function TreePage({
  tree,
  initialNodes,
  initialEdges,
}: TreePageProps) {
  return (
    <TreeContext.Provider value={{ tree, initialNodes, initialEdges }}>
      <NodesContextProvider>
        <TreeCanvas tree={tree} />
      </NodesContextProvider>
    </TreeContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps<TreePageProps> =
  async function getServerSideProps(context) {
    const treeId = context.query.treeId

    console.log(treeId)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/trees/${treeId}`
    )
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trees/63ebb297cfc76b14bf76d970`)
    console.log('response', JSON.stringify(response.data, null, 2))

    const allNodes: INode[] = []

    response.data.branches.forEach((branch: IBranch) => {
      allNodes.push({
        id: branch.branchId,
        type: branch.type, // || 'branch',
        position: {
          x:
            typeof branch.position.x === 'number'
              ? branch.position.x
              : parseInt(branch.position.x), // REMINDER: We expect to receive a number here from the server. If we don't, it will break the Edges spawning upon load.
          y:
            typeof branch.position.y === 'number'
              ? branch.position.y
              : parseInt(branch.position.y),
        },
        data: {
          label: branch.branchName,
          text: '',
        },
      })
    })

    response.data.unlinkedLeaves.forEach((leaf: ILeaf) => {
      allNodes.push({
        id: leaf.leafId,
        type: leaf.type, // || 'leftLeaf',
        position: {
          x:
            typeof leaf.position.x === 'number'
              ? leaf.position.x
              : parseInt(leaf.position.x), // REMINDER: We expect to receive a number here from the server. If we don't, it will break the Edges spawning upon load.
          y:
            typeof leaf.position.y === 'number'
              ? leaf.position.y
              : parseInt(leaf.position.y),
        },
        data: {
          label: leaf.leafName,
          text: '',
        },
      })
    })

    console.log('allNodes', allNodes)

    // const allEdges: IEdge[] = []

    const edgesFromServer: IEdgeServer[] = response.data
      .edges as unknown as IEdgeServer[]

    const edgeNodes: IEdge[] = edgesFromServer.map((edge) => ({
      id: edge.edgeId,
      source: edge.source,
      sourceHandle: null,
      target: edge.target,
      targetHandle: null,
      type: edge.type,
    }))

    console.log('edgeNodes', edgeNodes)

    // setEdges((prevEdges) => [...prevEdges, ...edgeNodes])

    return {
      props: {
        tree: response.data,
        initialNodes: allNodes,
        initialEdges: edgeNodes,
      },
    }
  }

// EXAMPLE DATA
/*
  initialNodes: [
          {
            id: 'node_000',
            type: 'default',
            position: { x: 0, y: 0 },
            data: { label: 'Node 1', text: '' },
          },
          {
            id: 'node_001',
            type: 'default',
            position: { x: 100, y: 100 },
            data: { label: 'Node 2', text: '' },
          },
        ],
    */

// TreePage.getLayout = function getLayout(page) {
//     return (
//         <div>
//             <Sidebar showTreeControls={true} />
//         </div>
//     )
// }
