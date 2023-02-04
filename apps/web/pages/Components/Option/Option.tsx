import React, { createContext, useState } from 'react'

function Option({ option, setOption, openBottomSheet }) {
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
          value={'creator'}
          className={
            (option === 'creator'
              ? 'bg-green-600'
              : 'bg-slate-500 hover:bg-red-800') +
            '  bg-slate-500 border-2 p-4 rounded border-black'
          }
          disabled={option === 'creator'}
        >
          Creator
        </button>
      </div>
      <div className=" m-5">
        <button className="bg-white border-2 p-4 rounded border-black hover:bg-red-800" onClick={openBottomSheet}>
          Info
        </button>
      </div>
    </div>
  )
}

export default Option
