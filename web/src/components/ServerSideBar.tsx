"use client"
import { ChatContext } from '@/context/providor';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { IoLogoIonitron } from "react-icons/io";
import axios from "@/lib/ChatClient"
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { useRouter } from 'next/navigation';


function ServerSideBar() {
  const { loading, token, ws, user } = useContext(ChatContext)

  if (loading) {
    return <div className='w-[85px] h-full bg-zinc-900 shadow-zinc-900 shadow-lg'>
      <IoLogoIonitron size={50} className='w-[90%] m-auto mt-3 cursor-pointer text-slate-500 transition hover:bg-cyan-300 hover:rounded-lg hover:text-slate-600 ' />
      <hr className='my-3 w-[80%] m-auto border-[1.5px] border-slate-500' />
      <ScrollArea className='w-full flex flex-col space-y-3 h-4/5 '>
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
        <Skeleton className='w-[60px] h-[60px] rounded-full m-auto my-2 bg-slate-500' />
      </ScrollArea>
    </div>
  }
  const [active, setactive] = useState<boolean>(false)
  useEffect(() => {
    ws && ws("connect", token).on("me", (socket) => {
      setactive(true)
    })
  }, [loading])
  const { data, error, isLoading } = useQuery({
    queryKey: ["server"],
    queryFn: () => {
      return axios.get("/server/get/all", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    },
  })
  const { push } = useRouter()
  return (
    <div className='w-[85px] h-full bg-zinc-900 shadow-zinc-900 shadow-lg'>
      <div className='w-full relative'>
        <IoLogoIonitron onClick={() => push('/me')}
          size={50}
          className='w-[90%] m-auto mt-3 cursor-pointer text-cyan-500 transition hover:bg-cyan-300 hover:rounded-lg hover:text-slate-600 ' />
          <div className={`w-[10px] h-[10px] absolute right-[22px] bottom-[3px] ${active?'bg-green-400':'bg-slate-800'} rounded-full border border-zinc-900`}/>
      </div>
      <hr className='my-3 w-[80%] m-auto border-[1.5px] border-slate-500' />
      {
        isLoading ? <div className='w-full h-4/5 flex justify-between items-center'>
          <IoLogoIonitron size={40} className='text-slate-400 animate-ping m-auto' />
        </div> : <ScrollArea className='w-full flex flex-row h-4/5'>
          {data?.data.map((e: any) => {
            return <div className='my-2 cursor-pointer'>
              <Avatar className='w-[50px] h-[50px] m-auto'>
                <AvatarImage src={e.imageUrl} />
                <AvatarFallback className='bg-slate-500'>
                  <Skeleton className='w-[30px] h-[30px] rounded-full bg-slate-600' />
                </AvatarFallback>
              </Avatar>
            </div>
          })}
        </ScrollArea>
      }
    </div>
  )
}

export default ServerSideBar
