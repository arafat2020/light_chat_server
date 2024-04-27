"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import { PersonIcon } from '@radix-ui/react-icons';



const homeMenu = [
  { name: 'onlien' },
  { name: 'All' },
  { name: 'Pending' },
  { name: 'Blocked' },
  { name: 'Add Friend' },
]


function Nav() {
  const [menu, setMenu] = useState<string>()
  return (
    <div className='w-full h-[50px] flex p-3'>
      <div className='flex-grow flex'>
        <div className='text-slate-100 font-sans font-semibold text-md flex items-center space-x-1 border-r border-slate-300'>
          <PersonIcon className='w-[20px] h-[20px] stroke-slate-300' />
          <h4 className='pr-1'>Friends</h4>
        </div>
        <div className='flex space-x-4 pl-3 text-md font-semibold font-sans text-slate-300'>
          {
            homeMenu.map((e) => {
              return <button
                onClick={() => setMenu(e.name)}
                className='cursor-pointer'>
                {e.name}
              </button>
            })
          }
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Nav
