import { createContext, ReactNode, useEffect } from "react";
import { DefaultEventsMap } from "socket.io";
import {io} from 'socket.io-client'
import { Socket } from "socket.io-client";


interface ISocketContext {
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
    sendMessage?: (eventName: string, message: unknown) => void;
    receiveMessage?: (eventName: string, callback: (...args: unknown[]) => void) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<ISocketContext >({});

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    autoConnect: true,
});

const SocketProvider = ({children}:{children:ReactNode})=>{
    useEffect(()=>{
        const onConnect = () => {
            console.log("Connected to server");
        };
        const onDisconnect = () => {
            console.log("Disconnected from server");
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    },[]);
    
    const sendMessage = (eventName: string, message:unknown)=>{
        socket.emit(eventName, message);
    }

    const receiveMessage = (eventName: string, callback: (...args: unknown[]) => void)=>{
        socket.on(eventName, callback);
    }

    return (
        <SocketContext.Provider value={{socket,sendMessage,receiveMessage}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider