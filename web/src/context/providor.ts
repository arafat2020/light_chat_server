"use client"
import { socket } from "@/lib/ChatClient";
import { createContext } from "react";
import { Socket } from "socket.io-client";
export const ChatContext = createContext<{ token: string, loading: boolean,user?:any, ws?: (path: Parameters<typeof socket>[0], token: string) => Socket }>({
    token: "",
    loading: true,
});

