// /trees/

import React, {
    useState
  } from 'react'
import { GetServerSidePropsResult, NextPageContext } from "next"
import { Sidebar } from "../../Components/Sidebar/Sidebar"
import axios from 'axios'
import { NodesContext } from '../../Resources/Packages/RFlow/NodesContext'
import { useContext } from 'react'
import { INode, IBranch, ILeaf, IEdgeInfo } from '../../Resources/Packages/RFlow/Custom'

interface TreePageProps {
    tree: any
}

export default function TreePage ({ tree }: TreePageProps) {
    return (
        <div>

        </div>
    )
}

export async function getServerSideProps(context: NextPageContext): Promise<GetServerSidePropsResult<TreePageProps>> {
    const treeId = context.query.treeId

    // REPLACE THIS WITH GET REQUEST FOR DUMMY TREE FROM NAVMODESELECTOR
    const tree = await axios.get(`/trees/${treeId}`)


    return {
        props: {
            tree
        }
    }
}


TreePage.getLayout = function getLayout(page) {
    return (
        <div>
            <Sidebar showTreeControls={true} />
        </div>
    )
}