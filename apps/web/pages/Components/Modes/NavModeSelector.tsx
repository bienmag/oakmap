import React, {
    useState
} from 'react'
<<<<<<< HEAD
=======
import axios from 'axios'

function NavModeSelector({ treeMode,
    setTreeMode,
    openBottomSheet,
    closeBottomSheet,
    renderPage,
    setRenderPage,
    setCurrentTreeId,
    setNodes,
    setEdges
}: any) {


    // let dummyTreeId = '63ebb297cfc76b14bf76d970'

    // DUMMY TREE LOADING TEST
    const handleClick = async (e) => {
        e.preventDefault();
      
        axios.get(`http://localhost:8080/trees/63ebb297cfc76b14bf76d970`)
            .then((response) => {
                setCurrentTreeId(response.data.id)
                const newNode = {
                    id: getId(),
                    type: response.data.id,
                    position: {
                        x: response.data.position.x,
                        y: response.data.position.y
                    },
                    data: { label: ``, text: '' },
                  }
            
                setNodes((nds) => nds.concat(newNode))
                setEdges()
        })
    }
>>>>>>> 7ebb80b (post-rebase disaster)

function NavModeSelector({ treeMode, setTreeMode, openBottomSheet, closeBottomSheet, renderPage, setRenderPage }: any) {

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
                                onClick={(e) => setTreeMode(e.target.value)
                                }
                                value={treeMode === 'reader' ? 'editor' : 'reader'}
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
                                    onClick={(e) => setRenderPage(e.target.value)
                                    }
                                    value={renderPage === 'dashboard' ? 'tree' : 'dashboard'}
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
                        >
                        Placeholder
                                  </button>
                                  {/* onClick={(e) => {
                                    handleClick
                                    setRenderPage(e.target.value)
                                        }
                                        }
                                        value={renderPage === 'dashboard' ? 'tree' : 'dashboard'} */}
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