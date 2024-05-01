"use client"
import React, { useEffect, useState } from 'react'
import { ChatContext } from './providor'
import { useUser } from '@clerk/nextjs'
import {
    QueryClientProvider,
    QueryClient
} from '@tanstack/react-query'

import axios from 'axios'

function Wraper({ children }: { children: React.ReactNode }) {
    const [token, setToekn] = useState<string>("")
    const { user } = useUser()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        user && axios.post("http://localhost:5000/auth/enter", {
            providor: "GOOGLE",
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            imgUrl: user.imageUrl,
            name: user.firstName as string,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoading(false))
      },[])

    console.log(loading);


 
    const queryClient = new QueryClient()
    return (
        <ChatContext.Provider value={{
            token: token,
            loading:true
        }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ChatContext.Provider>
    )
}

export default Wraper