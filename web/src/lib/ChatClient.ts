import axios from "axios";
import { io } from "socket.io-client";
export const baseURL = "http://localhost:5000"
export const baseUrl2 = "https://didactic-rotary-phone-g6757gg79w729gr5-5000.app.github.dev"
export const socket = (
    path: "connect", token: string
) => {
    return io(`${baseUrl2}/${path}`, {
        auth: {
            authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        transports: ["websocket"]
    })
}
export default axios.create({
    baseURL:baseUrl2
})

