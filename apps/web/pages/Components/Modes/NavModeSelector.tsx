import React, {
    useState
} from 'react'

function NavModeSelector() {
  
    // DETERMINES WHETHER TO RENDER THE DASHBOARD
    const [dashboard, setDasboard] = useState(false) // set to true to view the dashboard page

  return (
    <div>
          {dashboard ? (
                                
            // NEXT -- ADD THE OPTION SELECTOR LOGIC HERE FOR THE TREE EDITOR MODE
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
            ) : (
                <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
                    <nav aria-label="Global" className="flex space-x-10">
                        <a href="#" className="text-sm font-medium text-gray-900">
                            Info
                        </a>
                        <a href="#" className="text-sm font-medium text-gray-900">
                            Edit
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
        )}
    </div>
  )
}

export default NavModeSelector