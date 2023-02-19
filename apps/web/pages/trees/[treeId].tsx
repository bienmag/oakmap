// /trees/
import { GetServerSideProps } from "next"
import axios from 'axios'
import { NodesContextProvider } from '../../Resources/Packages/RFlow/NodesContext'
import { TreeCanvas } from '../../Components/Modes/TreeCanvas'
import { ITree } from "../../Resources/Packages/RFlow/Custom"

interface TreePageProps {

  tree: ITree,
}

export default function TreePage({ tree }: TreePageProps) {
  return (
    <NodesContextProvider>
      <TreeCanvas tree={tree} />
    </NodesContextProvider>
  )
}

export const getServerSideProps: GetServerSideProps<TreePageProps> = async function getServerSideProps(context) {

  const treeId = context.query.treeId


  console.log(treeId)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trees/${treeId}`)
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trees/63ebb297cfc76b14bf76d970`)
  console.log('response', JSON.stringify(response.data, null, 2))


  return {
    props: {
      tree: response.data
    }
  }
}


// TreePage.getLayout = function getLayout(page) {
//     return (
//         <div>
//             <Sidebar showTreeControls={true} />
//         </div>
//     )
// }

