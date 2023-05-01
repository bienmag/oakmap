import axios from 'axios'
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








  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/trees`)
      .then((response) => {
        setTrees(response.data)
      })
    /* axios.get('http://localhost:3333/comments')
        .then((response) => {
        setPopulartrees(response.data)
        console.log('response here', response.data)
        }) */
  }, [])

  return
}

export default DashboardMode