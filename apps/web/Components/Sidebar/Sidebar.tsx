import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  Fragment,
} from 'react'
import 'reactflow/dist/style.css'
import Image from 'next/image'
import logo from '../../Resources/Images/logo.png'
// import Sidebar from './Components/Sidebar/Sidebar'
import DescriptionMenu from '../DescriptionMenu/DescriptionMenu'
import Link from 'next/link'
// Selectors
import ModeSelector from '../Modes/ModeSelector'

////////////////////////////////////////////
//////// TAILWIND TEMPLATE CODE ////////////////////
///////////////////////////////////////////

// import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  ArchiveBoxIcon,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// REACT FLOW
import ReactFlow, { useNodesState, useEdgesState, Node } from 'reactflow'
import { initialNodes } from '../../Resources/Packages/RFlow/RFlow'
import { INodeInfo } from '../../Resources/Packages/RFlow/Custom'
import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '../Wrapper/Button'

const user = {
  name: 'Whitney Francis',
  email: 'whitney.francis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' },
    ],
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SidebarProps {
  children: React.ReactNode | React.ReactNode[] | null
}

// { TreeEditorMode, DashboardMode, ModeSelector }: any
export function Sidebar({ children }: SidebarProps) {
  // removed epxort default
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // from Tailwind UI

  // // Toggle editor vs reader modes -- originally we named this 'option'

  // Bottom Sheet State
  const [isOpen, setIsOpen] = useState(false)

  const openBottomSheet = () => setIsOpen(true)
  const closeBottomSheet = () => setIsOpen(false)

  const [renderPage, setRenderPage] = useState('tree')

  const [currentTreeId, setCurrentTreeId] = useState('')

  const { data: session, status } = useSession()

  // REACT FLOW STATE is now located in the NodesContext.tsx file
  /*   const [nodes, setNodes, onNodesChange] = useNodesState<INodeInfo>(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([]) */

  // MOSTLY TAILWIND TEMPLATE CODE BELOW

  return (
    <>
      {/*
      This example requires updating your template:
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full overflow-hidden">
      ```
    */}
      <div className="flex h-screen flex-col">
        {/* Top nav*/}
        <header className="relative flex h-16 flex-shrink-0 items-center  bg-white">
          {/* Logo area */}

          <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
            <Link
              href="/"
              className="flex h-16 w-16 items-center justify-center bg-org-palette md:w-20"
            >
              <Image className="h-8 w-auto " src={logo} alt="Your Company" />
            </Link>
          </div>

          {/* Picker area */}

          {/* Menu button area */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none  "
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop nav area */}

          <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between ">
            <div className="min-w-0 flex-1 ">
              <div className="relative max-w-xs text-gray-400 ">
                <label htmlFor="desktop-search" className="sr-only">
                  Search
                </label>
                <input
                  id="desktop-search"
                  type="search"
                  placeholder="Search"
                  className="rounded-3xl bg-white border-2 border-gray-400 text-gray-400 block w-full border-transparent pl-10 placeholder-gray-400   sm:text-base"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                  <MagnifyingGlassIcon
                    className="ml-3 text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mr-3">
            <Button
              className={
                'bg-dark-palette hover:bg-org-palette  hover:text-black text-white'
              }
              onClick={() =>
                status === 'authenticated' ? signOut() : signIn('google')
              }
            >
              {status === 'authenticated' ? 'SIGN OUT' : 'SIGN IN'}
            </Button>
          </div>
          {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
        </header>

        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Narrow sidebar*/}
          <nav
            aria-label="Sidebar"
            className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
          >
            <div className="relative flex w-20 flex-col space-y-3 p-3"></div>
          </nav>

          {/* Main area */}
          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Home
              </h1>
              {/* YOUR CONTENT - render modeSelector */}
              {/* ModeSelector(DashboardMode, TreeEditorMode) -- this was alternative as a way to pass components as props */}
              {children}
              {/* END YOUR CONTENT */}
            </section>
            {/* INFO BOTTOM SHEET */}
            <div></div>
          </main>
        </div>
      </div>
    </>
  )
}
