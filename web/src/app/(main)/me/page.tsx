"use client"
import ActiveFriends from '@/components/ActiveFriends'
import ChannelSideBar from '@/components/ChannelSideBar'
import Nav from '@/components/Nav'
import React, { Dispatch, createContext, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SIngleChatRoomChat from '@/components/SIngleChatRoomChat'

export const MeContext = createContext<{
    type: string,
    setType: Dispatch<React.SetStateAction<string>> | null,
    obj?: any,
    setObj?: Dispatch<React.SetStateAction<any>>
}>({
    type: "online",
    setType: null,
})
function Page() {
    const [type, setType] = useState<string>("online")
    const [obj, setObj] = useState<any>()
    const searchParams = useSearchParams()
    const id = searchParams.get("chatID")

    return (
        <div className='w-full h-full flex'>
            <MeContext.Provider value={{
                type,
                setType,
                obj,
                setObj
            }}>
                <ChannelSideBar />
                <div className='flex-grow flex flex-col'>
                    {id ? <SIngleChatRoomChat id={id} /> : <>
                        <Nav />
                        <div className='w-full flex-1'>
                            {!type || type === "online" ? <ActiveFriends /> : null}
                        </div></>}
                </div>
            </MeContext.Provider>
        </div>
    )
}

export default Page