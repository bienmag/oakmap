import React, {
    useState,
  } from 'react'
  import 'reactflow/dist/style.css'
import { TreeEditorMode } from "./TreeEditorMode"
import DashboardMode from "./DashboardMode"

// dashboardMode: any,treeEditorMode: any
function ModeSelector({ treeMode, setTreeMode, marked, setMarked, renderPage, setRenderPage }: any ){
 

  return(
    <div> {/* Render dashboard by default */ }
      {renderPage === 'tree' ? <TreeEditorMode treeMode={treeMode} setTreeMode={setTreeMode} marked={marked} setMarked={setMarked}  /> : renderPage === 'profile' ? <div>PROFILE PLACEHOLDER</div> : <DashboardMode />}
    </div>
    
  )

}



export default ModeSelector