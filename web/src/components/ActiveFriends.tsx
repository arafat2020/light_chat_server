"use client"
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import axiso from "@/lib/ChatClient";
import { ChatContext } from '@/context/providor';

function ActiveFriends() {
  const {token} = useContext(ChatContext)
   const {isLoading,data} = useQuery({
    queryKey:["active_friends"],
    queryFn:()=>{
      return axiso.get('/friend/list',{
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    }
   })
   console.log(data,isLoading);
  return (
    <div>ActiveFriends</div>
  )
}

export default ActiveFriends