"use client"
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import axiso from "@/lib/ChatClient";
import { ChatContext } from '@/context/providor';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { useRouter } from 'next/navigation';

function ActiveFriends() {
  const { token, user, ws, loading } = useContext(ChatContext)
  if (loading) return null
  const query = useQueryClient()
  const { push } = useRouter()
  const conversetion = useMutation({
    mutationFn: (credential: {
      memberOneId: string,
      memberTwoId: string
    }) => {
      console.log(credential);
      
      return axiso.post("/conversation/get", credential, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    },
    onSuccess: async (res) => {
      await query.invalidateQueries({ queryKey: ["Chennels"] })
      push(`/?conversetionID=${res.data.id}`)
    }
  })
  const { error, data, status, refetch } = useQuery({
    queryKey: ["active_friends"],
    queryFn: () => {
      return axiso.get('/friend/list', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    },

  })
  useEffect(() => {
    ws && ws("connect", token).on(user.id, async (user: any): Promise<any> => {
      console.log(user);
      await refetch()
      console.log(status);
    })
    console.log(user);
  }, [user])

  function ActiveFriend({ e }: { e: any }
  ) {
    return <div
      onClick={() => conversetion.mutate({ memberOneId: user.id, memberTwoId: e.id })}
      className='w-[90%] flex ml-[10px] space-x-5 items-center cursor-pointer'>
      <Avatar className='w-[35px] h-[35px]'>
        <AvatarImage src={e.imageUrl} />
        <AvatarFallback className='bg-slate-500'>
          <Skeleton className='w-[30px] h-[30px] rounded-full bg-slate-600' />
        </AvatarFallback>
      </Avatar>
      <p className='font-sans font-semibold text-[15px] text-slate-400'>{e.name}</p>
    </div>
  }
  return (
    <div className='w-full h-full space-y-5'>
      <h2 className='text-xl font-sans text-slate-400 ml-5 font-bold'>Active Friends</h2>
      {data?.data.map((e: any) => {
        return e.isaActive && <ActiveFriend e={e} key={e.id} />
      })}
    </div>
  )
}

export default ActiveFriends