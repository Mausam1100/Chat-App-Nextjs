"use client";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import ShowUsers from "@/components/ShowUsers";
import { useSearchUser } from "@/store/searchUsers";
import { useRef } from "react";
import LogOutModal from "@/components/LogOutModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DefaultProfilePic from "@/components/DefaultProfilePic";
import MenuModal from "@/components/navbar/MenuModal";

export default function MainLayout({children}: {children: React.ReactNode;}) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [logOutModal, setLogOutModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const { data: session } = useSession();

  const searchUsers = useSearchUser((state) => state.searchUsers);
  const setSearchUsers = useSearchUser((state) => state.setSearchUsers);

  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    setMenuModal(!menuModal)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuModal(false);
      }
    }

    if (menuModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuModal]);

  function handleSearch(value: string) {
    setSearch(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    controllerRef.current?.abort();

    if (!value.trim()) {
      setSearchUsers([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const response = await axios.get(
          "https://api-chat-app-eky0.onrender.com/api/v1/users/search",
          {
            params: {
              q: value,
            },
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          },
        );

        setSearchUsers(response.data.users);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.error("Search error:", error);
      }
    }, 300);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchUsers([]);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSearchUsers]);
  return (
    <>
      {logOutModal && <LogOutModal setLogOutModal={setLogOutModal} />}
      <div className="flex flex-col h-screen bg-[#161b22]">
        <div className="bg-[#161b22] max-w-[1600px] mx-auto w-full text-white flex items-center justify-between px-8 py-4">
          <h4 onClick={() => router.push('/')} className="text-lg cursor-pointer font-medium">
            &lt;chat-app/&gt;
          </h4>
          {session ? (
            <div className="flex gap-x-5 items-center">
              <div ref={searchRef} className="flex relative">
                <input
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="border outline-none border-[#555] rounded-l-3xl px-5 py-1.5"
                />
                <div className="bg-[#555] cursor-pointer w-fit rounded-r-full px-3 flex items-center justify-center">
                  <Search
                    className="-translate-x-0.5"
                    strokeWidth={3}
                    size={20}
                  />
                </div>
                <div className="absolute z-30 right-1 w-full top-11">
                  {searchUsers.length > 0 && (
                    <ShowUsers setSearch={setSearch} />
                  )}
                </div>
              </div>
              <div onClick={handleClick} className="group w-9 relative h-9 cursor-pointer z-40 rounded-full">
                {session?.user?.image ? <Image src={session?.user?.image} fill className="rounded-full object-cover aspect-square" alt="img" />:
                <DefaultProfilePic size="small" id={session?.user?.id} fullName={session?.user?.name ?? ""} />}
                <div className="bg-[#555] rounded-full absolute -bottom-1 right-0 p-0.5 flex justify-center items-center">
                  <ChevronDown className="translate-y-[0.6px] translate-x-[0.2px]" strokeWidth={3} size={11} />
                </div>
                <div className="absolute rounded-full inset-0 bg-white/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                {menuModal && <div ref={menuRef} className="absolute top-12 right-0">
                  <MenuModal id={session?.user?.id} fullName={session?.user?.name ?? ""} imageUrl={session?.user?.image ?? null} setMenuModal={setMenuModal} setLogOutModal={setLogOutModal} />
                </div>}
              </div>
            </div>
          ) : (
            <div className="space-x-4">
              <button className="text-sm cursor-pointer font-medium">
                <Link href="/auth/signin">Log in</Link>
              </button>
              <button className="bg-white cursor-pointer text-black px-2 py-1.5 font-medium text-sm rounded-full">
                <Link href="/auth/signup">Sign up</Link>
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </>
  );
}
