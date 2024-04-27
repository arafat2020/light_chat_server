import React from 'react'

function ChannelSideBar() {
  return (
    <div className='w-[250px] h-full shadow-zinc-900 shadow-lg'>
      <div className='w-full h-[50px] p-2 '>
        <input type="text"  className='w-full h-full bg-zinc-900 rounded-md p-2 outline-none focus:outline-cyan-500 outline-[1px]' placeholder='Find or Start Conversetion'/>
      </div>
    </div>
  )
}

export default ChannelSideBar
