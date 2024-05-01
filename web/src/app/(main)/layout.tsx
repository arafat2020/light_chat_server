import ServerSideBar from '@/components/ServerSideBar'
import React from 'react'

function Mainlaypur({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-full flex'>
            <ServerSideBar/>
            <div className='flex-grow h-full'>
            {children}
            </div>
        </div>
    )
}

export default Mainlaypur