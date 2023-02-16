import React, {
  useState,
} from 'react'
import 'reactflow/dist/style.css'
// import { TreeEditorMode } from "./TreeCanvas"
import DashboardMode from "./DashboardMode"
import { NodesContextProvider } from '../../Resources/Packages/RFlow/NodesContext'

// dashboardMode: any,treeEditorMode: any
function ModeSelector({ treeMode,
setTreeMode,
marked,
setMarked,
renderPage,
setRenderPage,
currentTreeId,
setCurrentTreeId,
}: any) {


return(
  <div> {/* Render dashboard by default */ }
    {/* renderPage === 'tree' ?
     : renderPage === 'profile' ? <div>PROFILE PLACEHOLDER</div>
      : <DashboardMode renderPage={renderPage} setRenderPage={setRenderPage} /> */}
  </div>
  
)

}



export default ModeSelector