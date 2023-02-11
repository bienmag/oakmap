import React, {
    useState
} from 'react'

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
                            Author
                        </a>
                        <a href="#" className="text-sm font-medium text-gray-900">
                        <img src="" alt="Watch List" className="text-sm font-medium text-gray-900"/>
                        </a>
                        <a href="#" className="text-sm font-medium text-gray-900">
                        <img src="" alt="Share Link" className="text-sm font-medium text-gray-900"/>
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
                <img src="" alt="Watch List" className="text-sm font-medium text-gray-900"/>
                </a>
                <a href="#" className="text-sm font-medium text-gray-900">
                <img src="" alt="Share Link" className="text-sm font-medium text-gray-900"/>
                </a>
            </nav>
          </div>
              ) : (
                      
            // DASHBOARD
              <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
              <nav aria-label="Global" className="flex space-x-10">
                  <a href="#" className="text-sm font-medium text-gray-900">
                      Test_Dash
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900">
                      Test_Dash2
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900">
                      Test_Dash3
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900">
                  <img src="" alt="Watch List" className="text-sm font-medium text-gray-900"/>
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900">
                  <img src="" alt="Share Link" className="text-sm font-medium text-gray-900"/>
                  </a>
              </nav>
            </div>
                
                        )}
    </div>
  )
}

export default NavModeSelector