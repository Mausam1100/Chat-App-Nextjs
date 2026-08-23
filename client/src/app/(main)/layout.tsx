"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowUsers from "@/components/ShowUsers";
import { useSearchUser } from "@/store/searchUsers";
import { useRef } from "react";
import LogOutModal from "@/components/LogOutModal";
import { useSession } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [logOutModal, setLogOutModal] = useState(false);
  const { data: session } = useSession();

  const searchUsers = useSearchUser((state) => state.searchUsers);
  const setSearchUsers = useSearchUser((state) => state.setSearchUsers);

  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          "http://localhost:4000/api/v1/users/search",
          {
            params: {
              q: value,
            },
            signal: controller.signal,
          },
        );

        setSearchUsers(response.data.users);
        console.log(searchUsers);
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
  }, []);

  useEffect(() => {
    console.log(searchUsers);
  }, [searchUsers]);
  return (
    <>
      {logOutModal && <LogOutModal setLogOutModal={setLogOutModal} />}
      <div className="flex flex-col h-screen">
        <div className="bg-[#161b22] text-white flex items-center justify-between px-10 py-4">
          <h4 className="text-lg cursor-pointer font-medium">
            &lt;chat-app/&gt;
          </h4>
          {session ? (
            <div className="flex gap-x-5">
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
              <button
                onClick={() => setLogOutModal(true)}
                className="bg-red-500 text-white cursor-pointer px-3.5 text-sm font-semibold py-1.5 rounded-full"
              >
                Log out
              </button>
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
