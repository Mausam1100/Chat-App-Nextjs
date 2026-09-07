"use client";

import axios from "axios";
import UserSideBar from "./UserSideBar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChatUsers } from "@/store/searchUsers";
import UserSideBarSkeleton from "./UserSideBarSkeleton";

export default function ChatSideBar() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const users = useChatUsers((state) => state.users);
  const setUsers = useChatUsers((state) => state.setUsers);

  useEffect(() => {
    if (!session?.user?.id) return;
    async function fetchFriends() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fetch-friends`,
          {
            params: {
              userId: session?.user?.id,
            },
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          }
        );
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setLoading(false);
      }
    }

    fetchFriends();
  }, [session?.user?.id, setUsers, session?.accessToken]);

  return (
    <div className="h-full min-h-0 bg-[#161b22] rounded-xl flex flex-col">
      <div className="border-b border-[#555] p-5 shrink-0">
        <h3>Messages</h3>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {loading ? (
            <UserSideBarSkeleton/>
        ) : (
          users.map((user) => (
            <UserSideBar
              key={user.id}
              id={user.id}
              email={user.email}
              fullName={user.fullName}
              imageUrl={user.imageUrl ?? null}
              latestMessage={user.latestMessage ?? null}
            />
          )))
        }
      </div>
    </div>
  );
}