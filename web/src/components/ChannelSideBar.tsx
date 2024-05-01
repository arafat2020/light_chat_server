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

function ChannelSideBar() {
  const { token, loading } = useContext(ChatContext)
  if (loading) {
    return <div className='w-[280px] h-full shadow-zinc-900 shadow-lg'>

    </div>
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["Chennels"],
    queryFn: () => {
      return axios.get("/conversation/get/all", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    }
  })

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
      </ScrollArea>
    </div>
  )
}

export default ChannelSideBar
