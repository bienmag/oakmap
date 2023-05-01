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
import { getToken } from 'next-auth/jwt'
import { JWT_SECRET } from '../Resources/lib/constants'
import Container from '../Components/Wrapper/Container'
import { Sidebar } from '../Components/Sidebar/Sidebar'
import { redirect } from 'next/dist/server/api-utils'
import cogoToast from 'cogo-toast'
import List from '../Components/Wrapper/List'

/////////////////////////////////////////////
// DASHBOARD ///////////////////////////////
/////////////////////////////////////////////

interface DashboardPageProps {
  trees: ITree[]
  allTrees: ITree[]
  // token: JWT
}

const DashboardPage: NextPage<DashboardPageProps> = ({
  trees,
  allTrees,
  // token,
}) => {
  const { data: session, status } = useSession()

  const handleCreateTree = async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('status', status)

    if (status === 'authenticated') {
      const tree = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trees`,
        {
          treeName: 'New Tree',
          user: session.user.id,
          username: session.user.name,
          userpic: session.user.image,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      )
      console.log('masession', session.user.name)
      cogoToast.success('The tree was created!', { hideAfter: 1 })

      ////////////////////////////redirect//////////////////////////////////////
      // redirect(`/trees/${tree.data._id}`)
      //////////////////////////////////
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
      <div className="flex justify-center h-screen w-auto bg-[url('../Resources/Images/SVG.png')] ">
        <Container>
          <div className="sm:flex sm:items-center ">
            <div className="sm:flex-auto ">
              <h1 className="Gill-Sans pl-4 text-3xl text-left font-semibold text-gray-900 ">
                {' '}
                {session
                  ? `Your trees,  ${session.user.name?.split(' ')[0]} `
                  : 'Your trees will be here'}
              </h1>
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
          {session ? <List trees={trees} /> : <YourListEmpty />}
          {/* </div> */}
        </Container>
        <Container>
          <>
            <div className="sm:flex sm:items-center ">
              <div className="sm:flex-auto ">
                <h1 className=" Gill-Sans pl-4 text-3xl text-left font-semibold text-gray-900 ">
                  Last trees by community
                </h1>
                {/* <p> {session ? `Welcome ${session.user.name}` : ''}</p>         ////////////////// add greetings  */}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
            </div>
            <div>
              <List global={true} trees={allTrees} />
            </div>
          </>
        </Container>
      </div>
    </Sidebar>
  )
}

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  const req = context.req
  const token = await getToken({ req, secret: JWT_SECRET })

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${session?.user.id}/trees`
  )

  const alltrees = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees`)

  return {
    props: {
      trees: response.data as ITree[],
      allTrees: alltrees.data as ITree[],
      // token,
    },
  }
}

export default DashboardPage

const YourListEmpty = () => {
  return (
    <div className="px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="Gill-Sans min-w-full divide-y divide-gray-300">
                <thead className="bg-ylw-palette">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-ylw-palette"
                    >
                      Sign in to create your first tree
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr key={123}>
                    <td className="whitespace-nowrap  text-md font-medium text-center text-gray-900 h-72">
                      Sign in to create your first tree
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
