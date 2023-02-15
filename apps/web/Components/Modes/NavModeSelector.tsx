import React, {
  useState
} from 'react'
import axios from 'axios'
import { NodesContext } from '../../Resources/Packages/RFlow/NodesContext'
import { useContext } from 'react'

function NavModeSelector({ treeMode,
  setTreeMode,
  openBottomSheet,
  closeBottomSheet,
  renderPage,
  setRenderPage,
  setCurrentTreeId
}: any) {

  // let dummyTreeId = '63ebb297cfc76b14bf76d970'

  const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange } = useContext(NodesContext)

  interface INode { // Generic Node data structure for nodes state
    id: string
    type: string
    position: { x: number; y: number }
    data: { label: string; text: string }
  }

  interface IBranch { // Branch Data from server response
    branchId: string
    branchName: string
    leaves: []
    position: { x: number; y: number }
    treeId: string
  }

  interface ILeaf { // Branch Data from server response
    branchId: string
    leafId: string
    leafName: string
    position: { x: number; y: number }
    treeId: string
  }

  // DUMMY TREE LOADING TEST
  const handleClick = async (e: React.MouseEvent) => {
          e.preventDefault()
        
          axios.get(`http://localhost:8080/trees/63ebb297cfc76b14bf76d970`)
            .then((response) => {
                
              setCurrentTreeId(response.data.id)
              
              console.log('response from GET request: ', response)
              console.log('response.data: ', response.data)

              const allNodes: INode[] = []
              
              const branchesFromServer: IBranch[] = response.data.branches
              const branchNodes: INode[] = branchesFromServer.map((branch) => {
                const newNode: INode = {
                  id: branch.branchId,
                  type: 'branch',
                  position: {
                    x: branch.position.x,
                    y: branch.position.y
                  },
                  data: {
                    label: branch.branchName,
                    text: ''
                  }
                }

                allNodes.push(newNode)

                return newNode

                })
                console.log('branchNodes: ', branchNodes)

              const unlinkedLeaves: ILeaf[] = response.data.unlinkedLeaves    
              const unlinkedLeafNodes: INode[] = unlinkedLeaves.map((leaf) => {
                const newNode: INode = {
                  id: leaf.leafId,
                  type: 'leftLeaf', // could also be rightLeaf, we need to specify type
                  position: {
                    x: leaf.position.x,
                    y: leaf.position.y
                  },
                  data: {
                    label: leaf.leafName,
                    text: ''
                  }
                }

                allNodes.push(newNode)

                return newNode

              })
              console.log('unlinkedLeafNodes: ', unlinkedLeafNodes)
 
          
              setNodes((nodes: INode[]) => nodes.concat(allNodes))
          
              setEdges()

      }
              )}

  return (
    <div>
      {renderPage === 'tree' ? (

        // TREE EDITOR MODE
        <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
          <nav aria-label="Global" className="flex space-x-10">
            <a href="#" className="text-sm font-medium text-gray-900">
              <button className="bg-white border-2 p-4 rounded border-black hover:bg-red-800" onClick={openBottomSheet}>
                Info
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                onClick={(e) => setTreeMode(treeMode === 'reader' ? 'editor' : 'reader')
                }
                className={
                  (treeMode === 'reader'
                    ? 'bg-slate-500' + '  border-2 p-4 rounded border-black'
                    : 'bg-green-500 hover:bg-red-800') +
                  '  border-2 p-4 rounded border-black'
                }
              /* disabled={option === 'reader'} */
              >
                Edit
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                onClick={(e) => setRenderPage(renderPage === 'dashboard' ? 'tree' : 'dashboard')}
                className={
                  ('bg-yellow-500' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Dashboard
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Watch List
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Share Link
              </button>
            </a>
          </nav>
        </div>

      ) : renderPage === 'profile' ? (

        // PROFILE PAGE
        <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
          <nav aria-label="Global" className="flex space-x-10">
            <a href="#" className="text-sm font-medium text-gray-900">
              Test_Profile
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              Test_Profile2
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              Test_Profile3
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Watch List
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Share Link
              </button>
            </a>
          </nav>
        </div>
      ) : (

        // DASHBOARD
        <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
          <nav aria-label="Global" className="flex space-x-10">
            {/* <a href="#" className="text-sm font-medium text-gray-900">
                      Test_Dash
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900">
                      Test_Dash2
                  </a> */}
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
                onClick={(e) => {
                  handleClick(e)
                  setRenderPage(renderPage === 'dashboard' ? 'tree' : 'dashboard')
                }}
              >
                Dummy Tree
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Watch List
              </button>
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              <button
                className={
                  ('bg-white' + '  border-2 p-4 rounded border-black'
                    + '  border-2 p-4 rounded border-black')
                }
              >
                Share Link
              </button>
            </a>
          </nav>
        </div>

      )}
    </div>
  )
}

export default NavModeSelector