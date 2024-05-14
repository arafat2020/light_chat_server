"use client"

import { ChatContext } from "@/context/providor"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { IoLogoIonitron } from "react-icons/io"


export default function Home() {
  const { loading } = useContext(ChatContext)
  const { push } = useRouter()
  if (loading) return (
    <div className="h-full w-full flex justify-around items-center">
      <IoLogoIonitron size={150} className=' text-slate-500 animate-ping' />
    </div>
  )
  push("/me")
}
