"use client"
import { ClerkProvider, useUser } from '@clerk/nextjs'
import './globals.css';
import { useEffect, useState } from 'react';
import { ChatContext } from '@/context/providor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { socket, baseUrl2, baseURL } from '@/lib/ChatClient';


function Wraper({ children }: { children: React.ReactNode }) {
  const [token, setToekn] = useState<string>("")
  const { user,isLoaded } = useUser()
  const [loading, setLoading] = useState<boolean>(true)
  const [me, setME] = useState<unknown>()
  
  useEffect(() => {
    user && axios.post(`${baseURL}/auth/enter`, {
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
      setToekn(res.data.access_token);
      setME(res.data.userObj)
    }).catch(err => {
      console.log(err);
      throw new Error(err)
    }).finally(() => setLoading(false))
  }, [user])


  const queryClient = new QueryClient()
  return (
    <ChatContext.Provider value={{
      token: token,
      loading: loading,
      ws: socket,
      user: me
    }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ChatContext.Provider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {




  return (

    <ClerkProvider>
      <Wraper>
        <html lang="en">
          <body className='w-screen h-screen bg-zinc-800'>
            {children}
          </body>
        </html>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Wraper>
    </ClerkProvider>


  )
}
