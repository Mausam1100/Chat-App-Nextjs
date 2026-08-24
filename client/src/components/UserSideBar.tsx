"use client";
import { useSelectedUser } from "@/store/searchUsers";
import Image from "next/image";
import DefaultProfilePic from "./DefaultProfilePic";

interface PropsType {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string | null
}

export default function UserSideBar({ fullName, email, id, imageUrl }: PropsType) {
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  function handleClick() {
    setSelectedUser({ id, fullName, email, imageUrl });
  }
  return (
    <>
      <div
        onClick={() => handleClick()}
        className={`flex cursor-pointer items-center border-b border-[#555] py-3 px-5 ${
          selectedUser?.id === id ? "bg-[#111]" : ""
        }`}
      >
        <div className="w-9 h-9">
          {imageUrl? (<Image
            className="rounded-full"
            src={imageUrl}
            alt="user1"
            height={36}
            width={36}
          />): 
          (
            <DefaultProfilePic id={id} fullName={fullName}  size="verySmall" />
          )}
        </div>
        <div className="pl-4">
          <h4 className="text-sm">{fullName}</h4>
          <p className="text-xs font-extralight">
            Hey! How are you doing? Where are...
          </p>
        </div>
      </div>
    </>
  );
}
