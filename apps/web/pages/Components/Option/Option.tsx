import React, { createContext, useState } from 'react'
import { Options } from '../../../Resources/Enums/Options'
import { v4 as uuidv4 } from 'uuid'
function Option({ treeMode, setTreeMode }) {
  return (
    <div className="  absolute inset-x-0 top-0 flex justify-center  ">
      {Options.map((type) => (
        <div className=" m-5" key={uuidv4()}>
          <button
            onClick={(e) => setTreeMode(e.target.value)}
            value={type}
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
