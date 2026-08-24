"use client";
import {
  EllipsisVertical,
  FaceSlightlySmiling,
  Phone,
  Send,
  Video,
} from "lucide-react";
import Image from "next/image";
import MessageBox from "./MessageBox";
import { useChatUsers, useSelectedUser } from "@/store/searchUsers";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import axios from "axios";
import Option from "./Option";
import DeleteModal from "./DeleteModal";
import DefaultProfilePic from "./DefaultProfilePic";
import EmojiPicker, { Theme } from "emoji-picker-react";

interface MessageArrayType {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  sender: {
    id: number;
    fullName: string;
    email: string;
    imageUrl: string | null;
  };
}

export function ChatBox() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDeleteChat, setShowDeleteChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const addOrMoveUser = useChatUsers((state) => state.addOrMoveUser);
  const [showOption, setShowOption] = useState(false);
  const [msg, setMsg] = useState("");
  const [messageArray, setMessageArray] = useState<MessageArrayType[]>([]);
  const { data: session, status } = useSession();
  const roomId = [session?.user.id, selectedUser?.id]
    .sort((a, b) => a! - b!)
    .join("-");

  function handleSendMessage() {
    if (!msg.trim()) return;
    addOrMoveUser(selectedUser!);
    socket.emit("chat", {
      roomId,
      msg,
      receiverId: selectedUser?.id,
      senderId: session?.user?.id,
    });
    setMsg("");
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageArray]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
        setShowOption(false);
      }
    }

    if (showOption) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOption]);

  useEffect(() => {
    function handleClickOutside2(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("click", handleClickOutside2);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    const handleReceiveMessage = (data: MessageArrayType) => {
      setMessageArray((prev) => [...prev, data]);
      if (data.senderId !== session?.user.id && data.sender) {
        addOrMoveUser(data.sender);
      }
    };
    socket.on("receive-msg", handleReceiveMessage);

    return () => {
      socket.off("receive-msg", handleReceiveMessage);
    };
  }, [addOrMoveUser, session?.user?.id]);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user.id) return;

    const handleConnect = () => {
      socket.emit("join-user", session.user.id);
    };

    socket.on("connect", handleConnect);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [status, session?.user.id]);

  useEffect(() => {
    if (!session?.user.id || !selectedUser?.id) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://api-chat-app-eky0.onrender.com/api/v1/fetch-messages",
          {
            params: {
              senderId: session.user.id,
              receiverId: selectedUser.id,
            },
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        );

        setMessageArray(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser?.id, session?.user.id, session?.accessToken]);
  return (
    <>
      {showDeleteChat && <DeleteModal setShowDeleteChat={setShowDeleteChat} />}
      <div className="bg-[#161b22] overflow-y-auto flex-1 rounded-xl h-full flex flex-col justify-between">
        <div className="border-b bg-[#161b22] sticky top-0 border-[#555] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-11 h-11">
              {selectedUser?.imageUrl ? (
                <Image
                  src={selectedUser.imageUrl}
                  width={45}
                  alt="User"
                  height={45}
                  className="rounded-full"
                />
              ) : (
                <DefaultProfilePic
                  id={selectedUser?.id ?? 0}
                  fullName={selectedUser?.fullName ?? ""}
                  size="small"
                />
              )}
            </div>
            <div className="px-4">
              <h3 className="font-medium">{selectedUser?.fullName}</h3>
              <p className="text-xs">{selectedUser?.email}</p>
            </div>
          </div>

          <div className="flex relative  items-center gap-x-4">
            <Video
              size={30}
              className="cursor-pointer fill-[#777] hover:fill-white transition-colors"
              strokeWidth={0}
            />
            <Phone
              className="cursor-pointer fill-[#777] hover:fill-white transition-colors"
              strokeWidth={0}
            />
            <button
              onClick={() => setShowOption(!showOption)}
              className="cursor-pointer"
            >
              <EllipsisVertical
                strokeWidth={2.5}
                className="text-[#888] hover:text-white"
              />
            </button>
            {showOption && (
              <div ref={optionRef} className="top-10 right-0 absolute">
                <Option setShowDeleteChat={setShowDeleteChat} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 px-8 py-4">
          <div>
            {messageArray.map((data, index) => (
              <MessageBox
                key={index}
                msg={data.content}
                sender={`${session?.user?.id === data.senderId ? "me" : "other"}`}
              />
            ))}
            <div ref={bottomRef}></div>
          </div>
        </div>

        <div className="px-5 py-3 bg-[#161b22] sticky bottom-0 flex items-center gap-x-4 justify-between">
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
            >
              <FaceSlightlySmiling />
            </button>

            {showEmojiPicker && (
              <div ref={emojiRef} className="absolute bottom-12 right-0 ">
                <EmojiPicker
                  theme={Theme.DARK}
                  onEmojiClick={(emojiData) => {
                    setMsg((prev) => prev + emojiData.emoji);
                    // setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}

            <input
              value={msg}
              onKeyDown={(e) => {
                if (e.key === "Enter" && msg.trim()) {
                  handleSendMessage();
                }
              }}
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              placeholder="Type a message here..."
              className="w-full rounded-3xl bg-[#555] pl-7 pr-13 outline-none py-2"
            />
          </div>

          <div className="p-2 bg-blue-500 rounded-full flex justify-center items-center">
            <button onClick={handleSendMessage} className="cursor-pointer">
              <Send
                className="-translate-x-0.5 translate-y-0.5"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
