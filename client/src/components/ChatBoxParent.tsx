"use client"
import { useSelectedUser } from "@/store/searchUsers"
import { ChatBox } from "./ChatBox"
import ChatBoxEmpty from "./ChatBoxEmpty"

export default function ChatBoxParent() {
    const selectedUser = useSelectedUser((state) => state.selectedUser)
    return (
        <>
        <div className="h-full">
            {selectedUser?
                (<ChatBox/>):
                (<div className='h-full'>
                    <ChatBoxEmpty />
                </div>)
            }
        </div>
        </>
    )
}