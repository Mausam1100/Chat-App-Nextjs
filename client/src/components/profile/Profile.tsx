"use client"
import Image from "next/image";
import { SquarePen } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import DefaultProfilePic from "../DefaultProfilePic";

interface PropsType {
  id: number | null;
  fullName: string;
  email: string;
  imageUrl: string | null;
}

export default function Profile({ fullName, email, imageUrl, id }: PropsType) {
  const [showEditProfile, setShowEditProfile] = useState(false)
  return (
    <>
      {showEditProfile && <EditProfileModal imageUrl={imageUrl ?? null} setShowEditProfile={setShowEditProfile} />}
      <div className="h-full min-h-0 bg-[#161b22] gap-y-4 rounded-xl flex-col flex justify-center items-center">
        <div className="h-52 w-52">
          {imageUrl ? (
            <Image
              className="h-full w-full rounded-full object-cover"
              src={imageUrl}
              alt={fullName}
              height={210}
              width={210}
            />
          ) : (
            <DefaultProfilePic size="large" id={id!} fullName={fullName} />
          )}
        </div>
        <div className="text-center border-b py-3">
          <h2 className="text-2xl font-semibold">{fullName}</h2>
          <p className="text-xs pt-1">{email}</p>
        </div>
        <div>
          <button onClick={() => setShowEditProfile(true)} className="flex items-center justify-center gap-x-3 px-8 cursor-pointer py-3 border rounded-xl border-[#555]">
            <SquarePen />
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}
