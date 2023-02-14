import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
} from 'react'
import 'reactflow/dist/style.css'
import { Sidebar } from '../Components/Sidebar/Sidebar'
// import { TreeEditorMode } from '../Components/Modes/TreeCanvas'
import DashboardMode from '../Components/Modes/DashboardMode'
import ModeSelector from '../Components/Modes/ModeSelector'
import { NodesContextProvider } from '../Resources/Packages/RFlow/NodesContext'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { ITree } from '../Resources/Packages/RFlow/Custom'

/////////////////////////////////////////////
// SIDEBAR STUFF ///////////////////////////
////////////////////////////////////////////

interface DashboardPageProps {
  trees: ITree[],
  popularTrees: ITree[],
}
const DashboardPage: NextPage<DashboardPageProps> = ({ trees, popularTrees }) => {

  const handleCreateTree = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:8080/trees', {
      treeName: 'Hi',
      user: 'ManelAndCory'
    })
    console.log('create tree response', response.data)

    // Get the unique ID of the tree
    /* const treeId = response.data.id
    console.log('response', response)
    console.log('treeId: ', treeId) */

    // Navigate to the TreeEditorMode component and pass the tree ID as a query parameter
    /* Router.push(`/tree?id=${treeId}`) */
  }

  return (
    <div className='flex justify-items'>
      {/* //taildwind FEEDS code here */}
      <div className='box-border h-62 w-62 p-4 border-4 max-w-screen-sm text-center m-8 flex-auto'> RITA TREES
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8'
          onClick={(e) => {
            handleCreateTree(e) // handle server request to create tree
          }}
        >+</button>
        < div >
          {trees.length > 0
            ? <TreeList trees={trees} />
            : (
              <p className='text-sm text-gray-500'>
                Sing in for create more trees
              </p>
            )}
        </div >
      </div>
      {/* //taildwind FEEDS code here */}
      <div className='box-border h-62 w-62 p-4 border-4 max-w-screen-sm text-center m-8 flex-auto'> RECENT TREES
        <div>
          <TreeList trees={popularTrees} />
        </div >
      </div>
    </div>
    // <ul>
    //   {trees.map(tree => (
    //     <li><Link href={`/trees/${tree}`}>{tree.name}</Link></li>
    //   ))}
    // </ul>
  )
}

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async (context) => {
  const response = await axios.get('http://localhost:8080/trees')

  return {
    props: {
      trees: response.data as ITree[],
      popularTrees: []
    }
  }
}

export default DashboardPage

interface TreeListProps {
  trees: ITree[]
}
const TreeList = ({ trees }: TreeListProps) => {
  return (
    <ul role='list' className='divide-y divide-gray-200'>
      {trees.map((tree) => (
        <li key={tree._id} className='py-4'>
          <Link href={`/trees/${tree._id}`}>
            <div className='flex space-x-3'>
              <img className='h-8 w-8 rounded-full bg-cyan-700' alt='' />
              <div className='flex-1 space-y-1'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-sm font-medium'>{tree.treeName}</h3>
                  {/* <p className='text-sm text-gray-500'>{tree.popularity}</p> */}
                </div>
                <p className='text-sm text-gray-500'>
                  {tree.description}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>)
}