import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    createContext,
    Fragment,
  } from 'react'
  import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Background,
    Controls,
    MiniMap,
    ConnectionLineType,
  } from 'reactflow'
  import 'reactflow/dist/style.css'
import { TreeEditorMode } from "./TreeEditorMode"
import DashboardMode from "./DashboardMode"

import Custom from '../Custom/Custom'
import Markdown from '../Markdown/Markdown'
import DescriptionMenu from '../DescriptionMenu/DescriptionMenu'
import Option from '../Option/Option'
import {
  leftLeafNode,
  rightLeafNode,
  BranchNode,
  RootNode,
} from '../CustomNode/CustomNodes'


// dashboardMode: any,treeEditorMode: any
function ModeSelector({ treeMode, setTreeMode }: any ){
  
    // DETERMINES WHETHER TO RENDER THE DASHBOARD
    const [dashboard, setDasboard] = useState(false) // set to true to view the dashboard page
 

  return(
    <div>
      {dashboard ? <DashboardMode /> : <TreeEditorMode treeMode={treeMode} setTreeMode={setTreeMode} />}
    </div>
    
  )

}



export default ModeSelector