import Image from "next/image"
import Logo from '../../public/icons8-message-100 (1).png'

export default function ChatBoxEmpty() {
    return (
        <>
            <div className="h-full bg-[#161b22] rounded-xl flex items-center justify-center flex-col">
                <div>
                    <Image width={200} height={200} color="white" src={Logo} alt="logo"  />
                </div>
                <div className="text-center">
                    <h1 className="pb-2">No conversation selected</h1>
                    <p>You can view your conversation in the sidebar</p>
                    <p>or search for friends in searchbar.</p>
                </div>
            </div>
        </>
    )
}