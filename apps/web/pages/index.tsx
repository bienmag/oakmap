import React from 'react'
import 'reactflow/dist/style.css'
// import { TreeEditorMode } from '../Components/Modes/TreeCanvas'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import axios, { all } from 'axios'
import { ITree } from '../Resources/Packages/RFlow/Custom'
import { useSession, signIn, signOut } from 'next-auth/react'
import { getServerSession, User } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { getToken, JWT } from 'next-auth/jwt'
import { JWT_SECRET } from '../Resources/lib/constants'
import Container from '../Components/Wrapper/Container'
import { Sidebar } from '../Components/Sidebar/Sidebar'


/////////////////////////////////////////////
// DASHBOARD ///////////////////////////////
/////////////////////////////////////////////

interface DashboardPageProps {
  trees: ITree[]
  allTrees: ITree[]
  token: string
}



const DashboardPage: NextPage<DashboardPageProps> = ({
  trees,
  allTrees,
  token,
}) => {
  const { data: session, status } = useSession()

  const handleCreateTree = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (status === 'authenticated') {
      const tree = await axios.post(
        'http://localhost:8080/trees',
        {
          treeName: 'New Tree',
          user: session.user.id,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      )


      ////////////////////////////redirect//////////////////////////////////////
      // redirect(`/trees/${tree.data._id}`)



    } else {
      signIn('google')
    }
  }


  // Get the unique ID of the tree
  /* const treeId = response.data.id``````````````````
  console.log('response', response)
  console.log('treeId: ', treeId) */

  // Navigate to the TreeEditorMode component and pass the tree ID as a query parameter
  /* Router.push(`/tree?id=${treeId}`) */

  return (

    <Sidebar>

      <div className="flex justify-center h-screen w-auto bg-[url('../Resources/Images/SVG.png')] "  >
        <Container  >
          <div className="sm:flex sm:items-center ">
            <div className="sm:flex-auto ">


              <h1 className="pl-4 text-3xl text-left font-semibold text-gray-900 "> {session ? `Your trees,  ${session.user.name?.split(' ')[0]} ` : 'Your trees will be here'}</h1>

            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={(e) => {
                  handleCreateTree(e)
                }}
                type="button"
                className="block rounded-md bg-org-palette py-1.5 px-3 text-center text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-dark-palette focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                +
              </button>
            </div>
          </div>





          {/* <b>Your</b> TREES
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        onClick={(e) => {
          handleCreateTree(e) // handle server request to create tree
          }}
          >
          +
          </button>
          <p> {session ? `Welcome ${session.user.name}` : ''}</p>
        <div> */}
          {
            session ? (
              <YourTreeList trees={trees} />
            ) : (
              <YourListEmpty />
            )
          }
          {/* </div> */}
        </Container >
        <Container >
          <>
            <div className="sm:flex sm:items-center ">
              <div className="sm:flex-auto ">
                <h1 className="pl-4 text-3xl text-left font-semibold text-gray-900 ">Last trees by community</h1>
                {/* <p> {session ? `Welcome ${session.user.name}` : ''}</p>         ////////////////// add greetings  */}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

              </div>
            </div>
            <div>
              <TreeList allTrees={allTrees} />
            </div>
          </>
        </Container>
      </div >
    </Sidebar>
  )
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  console.log('session form tsx index', session)

  const req = context.req
  const token = await getToken({ req, secret: JWT_SECRET })

  const response = await axios.get(
    `http://localhost:8080/users/${session?.user.id}/trees`
  )

  const alltrees = await axios.get('http://localhost:8080/trees')

  return {
    props: {
      trees: response.data as ITree[],
      allTrees: alltrees.data as ITree[],
      token,
    },
  }
}

export default DashboardPage

interface TreeListProps {
  trees: ITree[]

}

interface AllTreesProps {
  allTrees: ITree[]
}
const TreeList = ({ allTrees }: AllTreesProps) => {
  return (
    <div className="px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-ylw-palette">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      User
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allTrees.map((tree) => (
                    <tr key={tree._id}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-left text-gray-900"
                      >
                        <Link href={`/trees/${tree._id}`} className="no-underline text-gray-900">
                          {tree.treeName}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">{tree._id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">123</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const YourTreeList = ({ trees }: TreeListProps) => {
  return (
    <div className="px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <p className="text-lg text-gray-500">
              </p>
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-ylw-palette">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>

                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {trees.map((tree) => (
                    <tr key={tree._id}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-left text-gray-900"
                      >
                        <Link href={`/trees/${tree._id}`} className="no-underline text-gray-900">
                          {tree.treeName}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">123</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const YourListEmpty = () => {
  return (
    <div className="px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-ylw-palette">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-ylw-palette">
                      Sign in to create your first tree
                    </th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">

                  <tr key={123}>
                    <td className="whitespace-nowrap  text-md font-medium text-center text-gray-900 h-72"
                    >
                      Sign in to create your first tree

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}