"use client";
import ChatBoxParent from "@/components/ChatBoxParent";
import ChatSideBar from "@/components/ChatSideBar";
import { useShowChatBoxStore } from "@/store/searchUsers";

export default function Home() {
  const showChatBox = useShowChatBoxStore((state) => state.showChatBox);
  return (
    <div className="w-full h-[calc(100dvh-63px)] sm:h-[calc(100vh-70px)] max-w-[1600px] mx-auto sm:min-h-0 grid grid-cols-4 bg-[#2d3542] text-white">
      
      <div className={`p-3 ${!showChatBox ? 'col-span-4' : 'hidden'} sm:col-span-1 h-[calc(100dvh-63px)] sm:h-[calc(100vh-70px)] sm:block min-h-0`}>
        <ChatSideBar />
      </div>

      <div className={`p-3 ${!showChatBox ? 'hidden' : 'block col-span-4'} sm:block sm:col-span-3 min-h-0`}>
        <ChatBoxParent />
      </div>
    </div>
  );
}