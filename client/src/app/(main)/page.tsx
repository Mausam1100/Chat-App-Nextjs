import ChatBoxParent from "@/components/ChatBoxParent";
import ChatSideBar from "@/components/ChatSideBar";

export default function Home() {
  return (
    <div className="h-full w-full max-w-[1600px] mx-auto min-h-0 grid grid-cols-4 bg-[#2d3542] text-white">
      
      <div className="p-3 min-h-0">
        <ChatSideBar />
      </div>

      <div className="col-span-3 p-3 min-h-0">
        <ChatBoxParent />
      </div>
    </div>
  );
}