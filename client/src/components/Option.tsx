import { CircleUserRound, Trash } from "lucide-react";

interface Props {
  setShowDeleteChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Option({setShowDeleteChat}:Props) {
    function handleDeleteChat() {
        setShowDeleteChat(true)
    }
    return (
        <>
        <div className="bg-[#555] whitespace-nowrap rounded-xl">
            <ul className="flex flex-col justify-center">
                <li className="flex py-2 pt-3 rounded-t-xl hover:bg-[#444] px-4 gap-x-3 cursor-pointer">
                    <div><CircleUserRound className="text-[#f7f6f6]" strokeWidth={1.5} size={22} /></div>
                    <button><p className="text-[#f3f2f2] cursor-pointer">View profile</p></button>
                </li>
                <li className="flex rounded-b-xl py-2 pb-3 hover:bg-[#444] px-4 gap-x-3 cursor-pointer">
                    <div><Trash className="text-red-500" strokeWidth={1.5} size={22} /></div>
                    <button onClick={() => handleDeleteChat()}><p className="text-red-500 cursor-pointer">Delete Chat</p></button>
                </li>
            </ul>
        </div>
        </>
    )
}