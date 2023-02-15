import React, {
  useState,
} from 'react'
import 'reactflow/dist/style.css'
import { TreeEditorMode } from "./TreeEditorMode"
import DashboardMode from "./DashboardMode"

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
    {renderPage === 'tree' ?
    <TreeEditorMode
      treeMode={treeMode}
      setTreeMode={setTreeMode}
      currentTreeId={currentTreeId}
      setCurrentTreeId={setCurrentTreeId}
      marked={marked}
      setMarked={setMarked}
    /> : renderPage === 'profile' ? <div>PROFILE PLACEHOLDER</div>
      : <DashboardMode renderPage={renderPage} setRenderPage={setRenderPage} />}
  </div>
  
)

}



export default ModeSelector