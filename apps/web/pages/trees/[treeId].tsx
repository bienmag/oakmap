// /trees/
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { NodesContextProvider } from '../../Resources/Packages/RFlow/NodesContext'
import { TreeCanvas } from '../../Components/Modes/TreeCanvas'
import {
  IBranch,
  ILeaf,
  INode,
  ITree,
} from '../../Resources/Packages/RFlow/Custom'
import TreeContext from '../../Resources/Packages/RFlow/TreeContext'

interface TreePageProps {
  tree: ITree
  initialNodes: INode[]
}

export default function TreePage({ tree, initialNodes }: TreePageProps) {
  return (
    <TreeContext.Provider value={{ tree, initialNodes }}>
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

    response.data.branches.forEach((branch) => {
      allNodes.push({
        id: branch.branchId,
        type: branch.type || 'branch',
        position: {
          x: branch.position.x,
          y: branch.position.y,
        },
        data: {
          label: branch.branchName,
          text: '',
        },
      })
    })

    response.data.unlinkedLeaves.forEach((leaf) => {
      allNodes.push({
        id: leaf.leafId,
        type: leaf.type || 'leftLeaf',
        position: {
          x: leaf.position.x,
          y: leaf.position.y,
        },
        data: {
          label: leaf.leafName,
          text: '',
        },
      })
    })

    console.log('allNodes', allNodes)

    return {
      props: {
        tree: response.data,
        initialNodes: allNodes,
      },
    }
  }

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
