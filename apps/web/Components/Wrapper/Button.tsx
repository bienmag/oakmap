import React from 'react'

function Button({ className, onClick, children }: any) {
  return (
    <>
      <a href="#" className="text-sm font-medium text-gray-900">
        <button
          onClick={onClick}
          className={
            className +
            ' ' +
            'rounded-3xl p-2 px-5 rounded hover:text-white'
          }
        /* disabled={option === 'reader'} */
        >
          {children}
        </button>
      </a>
    </>
  )
}

export default Button
