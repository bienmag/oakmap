import React from 'react'

function Container({ className, children }: any) {
  return (
    <div
      className={
        className +
        ' ' +
        'box-border h-62 w-62 p-4 border-0 max-w-screen-sm text-center m-8 flex-auto rounded-xl'
      }
    >
      {children}
    </div>
  )
}

export default Container
