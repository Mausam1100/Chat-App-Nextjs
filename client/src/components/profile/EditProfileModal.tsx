"use client";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import DefaultProfilePic from "../DefaultProfilePic";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PropsType {
  setShowEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string | null;
}

export default function EditProfileModal({
  setShowEditProfile,
  
}: PropsType) {
  const router = useRouter()
  const { data: session, update } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(session?.user?.name);
  const [email] = useState(session?.user?.email);
  const [preview, setPreview] = useState("");
  const [date] = useState(session?.user?.createdAt);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const hasChange = fullName !== session?.user?.name || selectedFile !== null;

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleSaveChanges() {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName ?? "");
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      const response = await axios.put(
        `https://api-chat-app-eky0.onrender.com/api/v1/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      await update({
        name: response.data.user.fullName,
        image: response.data.user.imageUrl
      })
      setShowEditProfile(false);
      toast.success("Save changes successfully!")
      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }

  return (
    <>
      <div
        onClick={() => setShowEditProfile(false)}
        className="fixed inset-0 z-50 flex justify-center bg-black/40 items-center backdrop-blur-xs"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#161b22] rounded-xl py-7 px-8 border border-[#32373e]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Edit Profile</h3>
            <div
              onClick={() => setShowEditProfile(false)}
              className="rounded-full cursor-pointer hover:bg-[#444] bg-[#555] flex items-center justify-center p-1"
            >
              <X strokeWidth={2} size={17} />
            </div>
          </div>
          <p className="text-xs pt-0.5">Update your profile information</p>

          <div className="grid grid-cols-5 py-9 border-b border-[#555] gap-x-10">
            <div className="col-span-2">
              <h3 className="font-medium pb-4 text-sm">Profile Picture</h3>
              <div className="flex flex-col items-center gap-y-6">
                <div className="rounded-full w-40 h-40 border-2 border-[#555] p-1.5">
                  {preview ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={preview}
                      alt="Profile preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : session?.user?.image ? (
                    <Image
                      className="w-full h-full rounded-full aspect-square object-cover"
                      src={session.user.image}
                      alt="Profile"
                      height={150}
                      width={150}
                    />
                  ) : (
                    <DefaultProfilePic
                      size="medium"
                      id={session?.user?.id ?? 0}
                      fullName={session?.user?.name ?? ""}
                    />
                  )}
                </div>
                <button
                  onClick={handleClick}
                  className="flex hover:bg-[#222] items-center border border-[#555] rounded-lg px-4 py-2.5 gap-x-3 cursor-pointer"
                >
                  <Upload size={17} />
                  <h4 className="font-medium text-xs">Change Photo</h4>
                </button>
                <input
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="col-span-3 space-y-3.5">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="font-medium text-sm">
                  Full Name
                </label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  className="outline-none mt-1 px-3 py-2 rounded-lg text-xs border border-[#888]"
                  type="text"
                  value={fullName ?? ""}
                  id="fullName"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm">Email Address</label>
                <input
                  disabled
                  className="outline-none bg-[#222] text-[#777] mt-1 px-3 py-2 rounded-lg text-xs border border-[#333]"
                  type="text"
                  value={email ?? ""}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm">Joined On</label>
                <input
                  disabled
                  className="outline-none bg-[#222] text-[#777] mt-1 px-3 py-2 rounded-lg text-xs border border-[#333]"
                  type="text"
                  value={date ?? ""}
                />
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex justify-end items-center gap-x-3">
              <button
                onClick={() => setShowEditProfile(false)}
                className="px-4 cursor-pointer  hover:bg-[#333] py-2 rounded-lg text-xs border border-[#555] font-medium"
              >
                Cancel
              </button>
              <button
                disabled={!hasChange}
                onClick={handleSaveChanges}
                className={`px-4 py-2 rounded-lg text-xs font-medium ${
                  hasChange
                    ? "bg-red-600 hover:bg-red-400 cursor-pointer"
                    : "bg-[#333] text-[#777] cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
