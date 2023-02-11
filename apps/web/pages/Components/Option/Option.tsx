import React, { createContext, useState } from 'react'


//////////////////////////////////////////////////////////////////
// OLD OPTIONS FOR TOGGLING EDITOR MODE (FORMERLY CREATOR MODE)
//////////////////////////////////////////////////////////////////


function Option({ option, setOption, openBottomSheet }: any) {
  return (
    <div className="  absolute inset-x-0 top-0 flex justify-center  ">
      <div className=" m-5">
        <button
          onClick={(e) => setOption(e.target.value)}
          value={'reader'}
          className={
            (option === 'reader'
              ? 'bg-green-500'
              : 'bg-slate-500 hover:bg-red-800') +
            '  border-2 p-4 rounded border-black'
          }
          disabled={option === 'reader'}
        >
          Reader
        </button>
      </div>
      <div className=" m-5">
        <button
          onClick={(e) => setOption(e.target.value)}
          value={'editor'}
          className={
            (option === 'editor'
              ? 'bg-green-600'
              : 'bg-slate-500 hover:bg-red-800') +
            '  bg-slate-500 border-2 p-4 rounded border-black'
          }
          disabled={option === 'editor'}
        >
          Editor
        </button>
      </div>
    </div>
  )
}

export default Option
