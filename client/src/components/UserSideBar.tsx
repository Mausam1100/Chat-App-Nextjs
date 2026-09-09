"use client";
import { useChatUsers, useSelectedUser, useUnreadCountStore } from "@/store/searchUsers";
import Image from "next/image";
import DefaultProfilePic from "./DefaultProfilePic";

interface LatestMessage {
  content: string;
  receiverId: number;
  senderId: number;
}

interface PropsType {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string | null;
  latestMessage?: LatestMessage | null;
}

export default function UserSideBar({
  fullName,
  email,
  id,
  imageUrl,
  latestMessage
}: PropsType) {
  const unreadCounts = useUnreadCountStore((state) => state.unreadCounts);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  const users = useChatUsers((state) => state.users);
  console.log("users in sidebar", users);
  function handleClick() {
    setSelectedUser({ id, fullName, email, imageUrl })
  }
  return (
    <>
      <div
        onClick={() => handleClick()}
        className={`flex cursor-pointer items-center border-b border-[#555] py-3 px-5 ${
          selectedUser?.id === id ? "bg-[#111]" : ""
        }`}
      >
        <div className="w-9 h-9 shrink-0">
          {imageUrl ? (
            <Image
              className="rounded-full aspect-square object-cover"
              src={imageUrl}
              alt="user1"
              height={36}
              width={36}
            />
          ) : (
            <DefaultProfilePic id={id} fullName={fullName} size="verySmall" />
          )}
        </div>
        <div className="pl-4 w-full min-w-0 flex-1">
          <h4 className="text-sm">{fullName}</h4>
          <div className="flex items-center gap-x-2 justify-between w-full">
            <p className="text-xs truncate font-extralight">
              {latestMessage?.content ? latestMessage.content : "No messages yet"}
            </p>
            <div
              className={`w-5 aspect-square rounded-full bg-blue-400 flex items-center text-xs justify-center ${
                (unreadCounts[id] || 0) <= 0 ? "hidden" : ""
              }`}
            >
              {unreadCounts[id] || 0}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
