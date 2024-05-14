"use client"
import { PersonIcon, } from '@radix-ui/react-icons'
import { FaShop } from "react-icons/fa6";
import { AiFillFire } from "react-icons/ai"
import { CiCirclePlus } from "react-icons/ci";
import React, { useContext } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from './ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/ChatClient'
import { ChatContext } from '@/context/providor';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { useRouter } from 'next/navigation';

function ChannelSideBar() {
  const { push } = useRouter()
  const { token, loading, user } = useContext(ChatContext)
  if (loading) {
    return <div className='w-[280px] h-full shadow-zinc-900 shadow-lg'>

    </div>
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["Chennels"],
    queryFn: () => {
      return axios.get("/chat/get/all", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    }
  })
  console.log(data, error);

  return (
    <div className='w-[280px] h-full shadow-zinc-900 shadow-lg'>
      <ScrollArea className='w-full h-full'>
        <div className='w-full h-[50px] p-2 '>
          <input type="text" className='w-full h-full bg-zinc-900 rounded-md p-2 outline-none focus:outline-cyan-500 outline-[1px]' placeholder='Find or Start Conversetion' />
        </div>
        <div className='flex flex-col space-y-3 px-3 text-[17px] text-slate-400 font-semibold font-sans'>
          <div className='flex items-center space-x-4 cursor-pointer'>
            <PersonIcon className='stroke-slate-400 w-[17px] h-[17px]' />
            <span>Friends</span>
          </div>
          <div className='flex items-center space-x-4 cursor-pointer'>
            <AiFillFire className='stroke-slate-400 w-[17px] h-[17px]' />
            <span>Nitro</span>
          </div>
          <div className='flex items-center space-x-4 cursor-pointer'>
            <FaShop className='stroke-slate-400 w-[17px] h-[17px]' />
            <span>Shop</span>
          </div>
        </div>
        <div className='flex items-center px-3 py-3 space-x-3 text-slate-400 font-semibold font-sans'>
          <span>Direct Message</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CiCirclePlus size={30} />
              </TooltipTrigger>
              <TooltipContent>
                Create DM
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='w-full flex flex-col'>
          {data?.data.map((e: any) => {
            return <div
              onClick={() => {
                push(`me?chatID=${e.id}&userOne=${e.userOne.id}&userTwo=${e.userTwo.id}`)
              }}
              className='w-[90%] flex ml-[10px] space-x-5 items-center cursor-pointer'>
              <Avatar className='w-[35px] h-[35px]'>
                <AvatarImage src={e.userOneId === user.id ? e.userTwo.imageUrl : e.userOne.imageUrl} />
                <AvatarFallback className='bg-slate-500'>
                  <Skeleton className='w-[30px] h-[30px] rounded-full bg-slate-600' />
                </AvatarFallback>
              </Avatar>
              <p className='font-sans font-semibold text-[15px] text-slate-400'>{e.userOneId === user.id ? e.userTwo.name : e.userTwo.name}</p>
            </div>
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChannelSideBar
