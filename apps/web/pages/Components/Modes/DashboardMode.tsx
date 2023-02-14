import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// MAKE SURE TO DO THE FOLLOWING TO RUN SERVER:
// yarn add axios
// yarn global add json-server
// JSON SERVER PORT: http://localhost:3333/
// yarn json-server --port 3333

// OLD CODE:
// http://localhost:3333/posts
// http://localhost:3333/comments

type Tree = {
  id: number
  author: string
  imageUrl: string
  name: string
  description: string
  popularity: string
}

type PopularTree = {
  id: number
  author: string
  imageUrl: string
  name: string
  description: string
  popularity: string
}

function DashboardMode({ renderPage, setRenderPage }: any) {

  const [trees, setTrees] = useState<Array<Tree>>([])
  const [popularTrees, setPopulartrees] = useState<PopularTree[]>([])

  // useEffect(() => {
  //   axios.get('http://localhost:3333/posts')
  //     .then((response) => {
  //       setTrees(response.data)
  //     })
  //   axios.get('http://localhost:3333/comments')
  //     .then((response) => {
  //       setPopulartrees(response.data)
  //       console.log('response here', response.data)
  //     })
  // }, [])

  console.log('response', response)
  console.log('treeId: ', treeId) * /

  // Navigate to the TreeEditorMode component and pass the tree ID as a query parameter
  /* Router.push(`/tree?id=${treeId}`) */
}



axios.get('http://localhost:8080/trees')
  .then(function (response) {
    console.log(response);
  });

useEffect(() => {
  axios.get('http://localhost:8080/trees')
    .then((response) => {
      setTrees(response.data)
    })
  /* axios.get('http://localhost:3333/comments')
      .then((response) => {
      setPopulartrees(response.data)
      console.log('response here', response.data)
      }) */
}, [])

return (
  <div className='flex justify-items'>
    {/* //taildwind FEEDS code here */}
    <div className='box-border h-62 w-62 p-4 border-4 max-w-screen-sm text-center m-8 flex-auto'> RITA TREES
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8'
        onClick={(e) => {
          handleClick
          setRenderPage(e.target.value)
        }
        }
        value={'tree'}
      >+</button>
      < div >
        <ul role='list' className='divide-y divide-gray-200'>
          {
            trees.length > 0 ? (trees.map((tree) => (
              <li key={tree.id} className='py-4'>
                <div className='flex space-x-3'>
                  <img className='h-6 w-6 rounded-full' src={popularTree.imageUrl} alt='' />
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium'>{popularTree.name}</h3>
                      <p className='text-sm text-gray-500'>{popularTree.popularity}</p>
                    </div>
                    <p className='text-sm text-gray-500'>
                      {popularTree.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div >
    </div>
  </div>
)
}

export default DashboardMode