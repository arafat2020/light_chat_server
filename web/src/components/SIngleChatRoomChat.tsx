"use client"
import { ChatContext } from '@/context/providor'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import axios from '@/lib/ChatClient'
import { useSearchParams } from 'next/navigation'
import { IoLogoIonitron } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'
import { BiSend } from "react-icons/bi";


function SIngleChatRoomChat({ id, page = 1 }: { id: string, page?: number }) {
  const { token, user } = useContext(ChatContext)
  const searchParams = useSearchParams()
  console.log(searchParams.get("userOne"));
  const { isLoading, data, error } = useQuery({
    queryKey: ["single_room_message"],
    queryFn: () => {
      return axios.post(`/chat/get`, {
        userOneId: searchParams.get("userOne"),
        userTwoId: searchParams.get("userTwo")
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    }
  })
  console.log(data?.data, error);
  function SIngleRommNav({ data }: { data: any }) {
    return (
      <div className='w-full h-[50px] flex justify-between items-center shadow-zinc-900 shadow-lg'>
        <div className='flex items-center pl-2 space-x-2'>
          <Avatar className='w-[35px] h-[35px]'>
            <AvatarImage src={data.userOneId === user.id ? data.userTwo.imageUrl : data.userOne.imageUrl} />
            <AvatarFallback className='bg-slate-500'>
              <Skeleton className='w-[30px] h-[30px] rounded-full bg-slate-600' />
            </AvatarFallback>
          </Avatar>
          <p className='font-sans font-semibold text-[15px] text-slate-400'>{data.userOneId === user.id ? data.userTwo.name : data.userTwo.name}</p>
        </div>
      </div>
    )
  }
  function MessageBody() {
    return <div className='w-full flex-grow flex flex-col '>

    </div>
  }
  function MessageInput() {
    return <div className='w-full flex items-center h-[60px] '>
      <div className='flex-grow h-[90%] p-2'>
      <input type="text" placeholder='Type to send messaged' className='w-full h-full bg-slate-700 outline-none text-slate-400 rounded-full pl-3 focus:outline-cyan-500 focus:bg-slate-800' />
      </div>
      <div className='flex p-2 pr-2'>
        <button><BiSend size={30} className='text-cyan-500'/></button>
      </div>
    </div>
  }
  return (
    <div className='w-full h-full flex flex-col'>
      {isLoading ? <div className="h-full w-full flex justify-around items-center">
        <IoLogoIonitron size={150} className=' text-slate-500 animate-ping' />
      </div> : <>
        <SIngleRommNav data={data?.data} />
        <MessageBody />
        <MessageInput /></>}

    </div>
  )
}

export default SIngleChatRoomChat