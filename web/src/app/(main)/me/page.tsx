"use client"
import ActiveFriends from '@/components/ActiveFriends'
import ChannelSideBar from '@/components/ChannelSideBar'
import Nav from '@/components/Nav'
import React, { Dispatch, createContext, useState } from 'react'

export const MeContext = createContext<{
    type: string,
    setType: Dispatch<React.SetStateAction<string>> | null
}>({
    type: "online",
    setType: null
})
function Page() {
    const [type, setType] = useState<string>("online")
    console.log(type);

    return (
        <div className='w-full h-full flex'>
            <MeContext.Provider value={{
                type,
                setType
            }}>
                <ChannelSideBar />
                <div className='flex-grow flex flex-col'>
                    <Nav />
                    <div className='w-full flex-1'>
                        {!type || type === "online" ? <ActiveFriends /> : null}
                    </div>
                </div>
            </MeContext.Provider>
        </div>
    )
}

export default Page