import React, { createContext, useState } from 'react'
import { TREEMODES } from '../../Resources/Enums/Options'
import { v4 as uuidv4 } from 'uuid'
import { TreeMode } from '../../Resources/Packages/RFlow/Custom'
interface IOptionProps {
  treeMode: TreeMode
  setTreeMode: React.Dispatch<React.SetStateAction<string>>
}
function Option({ treeMode, setTreeMode }: IOptionProps) {
  return (
    <div className="  absolute inset-x-0 top-0 flex justify-center  ">
      {TREEMODES.map((type) => (
        <div className=" m-5" key={uuidv4()}>
          <button
            onClick={(e) => setTreeMode(type)}
            className={
              (treeMode === type
                ? 'bg-green-500'
                : 'bg-slate-500 hover:bg-red-800') +
              '  border-2 p-4 rounded border-black'
            }
            disabled={treeMode === type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Option
