import React, { useState } from 'react'
import DescriptionMenu from '../DescriptionMenu/DescriptionMenu'
import Option from '../Option/Option'
import Button from '../Wrapper/Button'
import cogoToast from 'cogo-toast'

function Field({ treeMode, setTreeMode }: any) {
  const [isOpen, setIsOpen] = useState(false)

  const openBottomSheet = () => setIsOpen(true)
  const closeBottomSheet = () => setIsOpen(false)

  return (
    <div className="z-10 relative flex justify-end m-4">
      <DescriptionMenu
        isOpen={isOpen}
        closeBottomSheet={closeBottomSheet}
        treeMode={treeMode}
      />

      <nav aria-label="Global" className="flex space-x-6">
        <Button
          onClick={() =>
            setTreeMode(treeMode === 'reader' ? 'editor' : 'reader')
          }
          className={
            treeMode === 'reader'
              ? 'bg-slate-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-blue-600'
          }
        >
          {treeMode === 'reader' ? 'Edit' : 'View'}
        </Button>
        <Button
          onClick={openBottomSheet}
          className={'hover:bg-slate-800 hover:text-white'}
        >
          Info
        </Button>
        <Button
          className={'hover:bg-slate-800 hover:text-white'}
          onClick={() => {
            if (typeof window !== 'undefined') {
              navigator.clipboard.writeText(window.location.href)
            }

            cogoToast.success('Roadmap Link Copied!', { hideAfter: 1 })
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </Button>
      </nav>
    </div>
  )
}

export default Field
