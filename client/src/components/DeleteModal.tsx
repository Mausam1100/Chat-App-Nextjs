"use client"
import { useChatUsers, useSelectedUser } from "@/store/searchUsers";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Props {
  setShowDeleteChat: React.Dispatch<React.SetStateAction<boolean>>;
}

async function deleteChat(userId: number, otherUserId: number, token: string) {
    await axios.delete('http://localhost:4000/api/v1/delete-chat', {
        params: {
            userId: userId,
            otherUserId: otherUserId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
    toast.success("Chat deleted successfully!")
}

export default function DeleteModal({setShowDeleteChat}: Props) {
    const removeUser = useChatUsers((state) => state.removeUser)
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser)
    const selectedUser = useSelectedUser((state) => state.selectedUser)
    const {data: session} = useSession()
    async function handleClick() {
        console.log('Delete chat!')
        if (!selectedUser || !session?.user?.id) return;
        await deleteChat(session?.user?.id, selectedUser?.id, session?.accessToken)
        setSelectedUser(null)
        removeUser(selectedUser.id)
    }
    return (
        <>
        <div onClick={() => setShowDeleteChat(false)} className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-xs bg-black/40">
            <div onClick={(e) => e.stopPropagation()} className="bg-[#555] flex flex-col px-4 rounded-xl max-w-90">
                <div className="text-center pt-5 pb-3 space-y-2">
                    <h2 className="text-xl font-medium">Delete Chat</h2>
                    <p>Are you sure you want to delete all message history with John Wick</p>
                </div>
                <div className="flex pb-3 justify-end items-center gap-x-4">
                    <button onClick={() => setShowDeleteChat(false)} className="hover:bg-[#999] cursor-pointer px-3 py-1 rounded-lg">Cancel</button>
                    <button onClick={() => handleClick()} className="hover:bg-red-100 px-3 py-1 cursor-pointer rounded-lg text-red-500">Delete</button>
                </div>
            </div>
        </div>
        </>
    )
}