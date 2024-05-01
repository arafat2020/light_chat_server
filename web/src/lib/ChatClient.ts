import axios from "axios";
import { io } from "socket.io-client";

const baseURL = "http://localhost:5000"
export const socket = (
    path: "connect", token: string
) => {
    return io(`${baseURL}/${path}`, {
        auth: {
            authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        transports: ["websocket"]
    })
}
export default axios.create({
    baseURL
})

